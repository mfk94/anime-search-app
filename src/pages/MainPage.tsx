import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import { Box, CircularProgress, Container, Pagination, Stack, Typography } from '@mui/material';
import AnimeList from '../components/AnimeList';
import { Anime, AnimeCategory, SearchFilters } from '../types/anime';
import { fetchAllAnime } from '../api/jikan';
import { useNavigate } from 'react-router-dom';

const MainPage: React.FC = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState<SearchFilters>({
        query: '',
        category: 'All' as AnimeCategory
    });
    const [animes, setAnimes] = useState<Anime[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

            console.log('Filters:', filters.category);
            console.log('params:', params.toString());

            params.append('page', page.toString());
            params.append('limit', '24');
            params.append('sfw', 'true');

            const response = await fetchAllAnime(params);

            if (response) {
                setAnimes(response.data);
                console.log('Fetching anime data...', response.data);

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

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchAnime();
        }, 250); // 250ms delay to simulate loading

        return () => clearTimeout(timer);

    }, [filters, page]);

    const handleAnimeClick = (anime: Anime) => {
        navigate(`/anime/${anime.mal_id}`);
    };

    const handleFilterChange = (newFilters: SearchFilters) => {
        setFilters(newFilters);
        setPage(1); // Reset to first page when filters change
    };

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    return (
        <>

            <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
                <Box sx={{ mb: 4 }}>
                    <Typography
                        variant="h4"
                        component="h1"
                        gutterBottom
                        sx={{
                            fontWeight: 700,
                            mb: 1
                        }}
                    >
                        Discover Anime
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mb: 4 }}
                    >
                        Browse through our collection of anime series and movies
                    </Typography>

                    <SearchBar
                        filters={filters}
                        onFilterChange={handleFilterChange}
                    />
                </Box>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                        <Typography color="error">{error}</Typography>
                    </Box>
                ) : (
                    <Box sx={{ mt: 4 }}>

                        <Typography variant="body1"
                            color="text.secondary"
                            sx={{ mb: 4 }}>
                            Found {animes.length} results
                        </Typography>
                        <AnimeList
                            animes={animes}
                            onAnimeClick={handleAnimeClick}
                        />

                        {animes.length > 0 && (
                            <Stack spacing={2} alignItems="center" sx={{ mt: 6 }}>
                                <Pagination
                                    count={totalPages}
                                    page={page}
                                    onChange={handlePageChange}
                                    color="primary"
                                    size="large"
                                    showFirstButton
                                    showLastButton
                                />
                            </Stack>
                        )}
                    </Box>
                )}
            </Container>
        </>
    );
};

export default MainPage;