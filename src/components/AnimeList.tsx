import React from 'react';
import { Grid, Box, Typography, Fade } from '@mui/material';
import AnimeCard from './AnimeCard';
import { Anime } from '../types/anime';

interface AnimeListProps {
    animes: Anime[];
    onAnimeClick: (anime: Anime) => void;
}

const AnimeList: React.FC<AnimeListProps> = ({ animes, onAnimeClick }) => {
    if (animes.length === 0) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '50vh',
                flexDirection: 'column',
                p: 4
            }}>
                <Typography variant="h5" component="h2" gutterBottom color="text.secondary">
                    No anime found
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Try adjusting your search or filters
                </Typography>
            </Box>
        );
    }

    return (
        <Grid container spacing={3}>
            {animes.map((anime, index) => (
                <Fade
                    key={anime.mal_id}
                    in={true}
                    timeout={(index + 1) * 200}
                    style={{ transitionDelay: `${index * 50}ms` }}
                >
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} >
                        <AnimeCard anime={anime} onClick={onAnimeClick} />
                    </Grid>
                </Fade>
            ))}
        </Grid>
    );
};

export default AnimeList;