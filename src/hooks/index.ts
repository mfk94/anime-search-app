import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';
import { Anime, AnimeCategory, SearchFilters } from '../types/anime';
import { fetchAllAnime, fetchAnimeDetails } from '../api/jikan';

// Hook for managing anime search and filtering
export const useAnimeSearch = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);

    const [filters, setFilters] = useState<SearchFilters>({
        query: searchParams.get('q') || '',
        category: (searchParams.get('category') as AnimeCategory) || 'All'
    });
    const [animes, setAnimes] = useState<Anime[]>([]);
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const updateUrlParams = (newFilters: SearchFilters, newPage: number) => {
        const params = new URLSearchParams();
        if (newFilters.query) params.set('q', newFilters.query);
        if (newFilters.category !== 'All') params.set('category', newFilters.category);
        if (newPage > 1) params.set('page', newPage.toString());
        
        navigate({
            pathname: '/',
            search: params.toString()
        }, { replace: true });
    };

    const fetchAnime = async () => {
        try {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams();

            if (filters.query) {
                params.append('q', filters.query);
            }

            if (filters.category !== 'All') {
                params.append('status', filters.category.toLowerCase());
            }

            params.append('page', page.toString());
            params.append('limit', '24');
            params.append('sfw', 'true');

            const response = await fetchAllAnime(params);

            if (response) {
                // Remove duplicates based on mal_id
                const uniqueAnimes = response.data.reduce((acc: Anime[], current: Anime) => {
                    const exists = acc.find(item => item.mal_id === current.mal_id);
                    if (!exists) {
                        acc.push(current);
                    }
                    return acc;
                }, []);

                setAnimes(uniqueAnimes);
                setTotalPages(response.pagination.last_visible_page);
            } else {
                throw new Error('Failed to fetch anime data');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            setAnimes([]);
        } finally {
            setLoading(false);
        }
    };

    // Effect to handle URL parameter changes
    useEffect(() => {
        const newPage = Number(searchParams.get('page')) || 1;
        const newQuery = searchParams.get('q') || '';
        const newCategory = (searchParams.get('category') as AnimeCategory) || 'All';

        if (newPage !== page || newQuery !== filters.query || newCategory !== filters.category) {
            setPage(newPage);
            setFilters({
                query: newQuery,
                category: newCategory
            });
        }
    }, [location.search]);

    // Effect to fetch data when filters or page changes
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchAnime();
        }, 250);

        return () => clearTimeout(timer);
    }, [filters, page]);

    const handleFilterChange = (newFilters: SearchFilters) => {
        setFilters(newFilters);
        setPage(1);
        updateUrlParams(newFilters, 1);
    };

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        if (value !== page) {
            setPage(value);
            updateUrlParams(filters, value);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return {
        filters,
        animes,
        page,
        totalPages,
        loading,
        error,
        handleFilterChange,
        handlePageChange
    };
};

// Hook for managing anime details
export const useAnimeDetails = (id: string | undefined) => {
    const [anime, setAnime] = useState<Anime | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDetails = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetchAnimeDetails(Number(id));
            setAnime(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch anime details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchDetails();
        }, 250);

        return () => clearTimeout(timer);
    }, [id]);

    return { anime, loading, error };
};

// Hook for responsive design
export const useResponsive = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

    return {
        isMobile,
        isTablet,
        isDesktop,
        theme
    };
};

// Hook for navigation
export const useNavigation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [previousPath, setPreviousPath] = useState<string>('/');

    useEffect(() => {
        // Update previous path when location changes, but only if it's not the current path
        if (location.pathname !== previousPath) {
            setPreviousPath(location.pathname);
        }
    }, [location.pathname]);

    const goBack = () => {
        // If we're on a details page and the previous path was the main page with search params
        if (location.pathname.startsWith('/anime/') && previousPath === '/') {
            navigate('/', { replace: true });
        } else {
            navigate(-1);
        }
    };

    const goToAnimeDetails = (animeId: number) => {
        navigate(`/anime/${animeId}`);
    };

    return {
        goBack,
        goToAnimeDetails,
        currentPath: location.pathname
    };
};
