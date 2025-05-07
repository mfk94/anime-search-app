import React from 'react';
import {
    Paper,
    InputBase,
    IconButton,
    ToggleButtonGroup,
    ToggleButton,
    Box,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { Search as SearchIcon } from 'lucide-react';
import { SearchFilters, AnimeCategory } from '../types/anime';

interface SearchBarProps {
    filters: SearchFilters;
    onFilterChange: (filters: SearchFilters) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ filters, onFilterChange }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onFilterChange({ ...filters, query: e.target.value });
    };

    const handleCategoryChange = (
        _: React.MouseEvent<HTMLElement>,
        newCategory: AnimeCategory | null
    ) => {
        if (newCategory !== null) {
            onFilterChange({ ...filters, category: newCategory });
        }
    };

    return (
        <Box sx={{
            mb: 4,
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            gap: 2,
            width: '100%'
        }}>
            <Paper
                component="form"
                sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: isMobile ? '100%' : '60%',
                    borderRadius: 8,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    transition: 'box-shadow 0.3s ease',
                    '&:hover': {
                        boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
                    },
                }}
                elevation={0}
                onSubmit={(e) => e.preventDefault()}
            >
                <IconButton sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon size={20} />
                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search for anime (e.g., Naruto, One Piece, Bleach...)"
                    inputProps={{ 'aria-label': 'search anime' }}
                    value={filters.query}
                    onChange={handleSearchChange}
                />
            </Paper>

            <ToggleButtonGroup
                value={filters.category}
                exclusive
                onChange={handleCategoryChange}
                aria-label="anime category"
                sx={{
                    height: isMobile ? 'auto' : 56,
                    flexWrap: 'wrap',
                    justifyContent: isMobile ? 'center' : 'flex-end',
                }}
                size={isMobile ? 'small' : 'medium'}
            >
                <ToggleButton value="All" aria-label="all anime">
                    All
                </ToggleButton>
                <ToggleButton value="Airing" aria-label="airing anime">
                    Airing
                </ToggleButton>
                <ToggleButton value="Complete" aria-label="finished anime">
                    Finished
                </ToggleButton>
                <ToggleButton value="Upcoming" aria-label="upcoming anime">
                    Upcoming
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
};

export default SearchBar;