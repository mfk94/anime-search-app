import React from 'react';
import { useParams } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    Chip,
    Grid,
    Stack,
    IconButton,
    CircularProgress,
    Paper,
    Button
} from '@mui/material';
import { ArrowLeft, Calendar, Film, Star, Users, Trophy, Clock, Heart, Play } from 'lucide-react';
import { useAnimeDetails, useResponsive, useNavigation } from '../hooks';

const DetailsPage: React.FC = () => {
    const { id } = useParams();
    const { anime, loading, error } = useAnimeDetails(id);
    const { isMobile, theme } = useResponsive();
    const { goBack } = useNavigation();

    if (loading) {
        return (
            <>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                    <CircularProgress />
                </Box>
            </>
        );
    }

    if (error || !anime) {
        return (
            <>
                <Container>
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                        <Typography color="error">{error || 'Anime not found'}</Typography>
                    </Box>
                </Container>
            </>
        );
    }

    return (
        <>
            <Box
                sx={{
                    position: 'relative',
                    minHeight: '100vh',
                    pb: 8,
                    background: theme.palette.background.default,
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        height: { xs: 300, md: 500 },
                        overflow: 'hidden',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '70%',
                            background: `linear-gradient(to bottom, transparent, ${theme.palette.background.default})`,
                        },
                    }}
                >
                    <Box
                        component="img"
                        src={anime.images.jpg.large_image_url}
                        alt={anime.title}
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            filter: 'blur(8px)',
                            transform: 'scale(1.1)',
                        }}
                    />
                </Box>

                <Container maxWidth="xl" sx={{ mt: { xs: -15, md: -20 }, position: 'relative', zIndex: 1 }}>
                    <IconButton
                        onClick={goBack}
                        sx={{
                            position: 'absolute',
                            top: { xs: -40, md: -60 },
                            left: { xs: 16, md: 24 },
                            bgcolor: 'background.paper',
                            boxShadow: theme.shadows[2],
                            '&:hover': { bgcolor: 'background.paper' },
                        }}
                    >
                        <ArrowLeft />
                    </IconButton>

                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, md: 4, lg: 3 }} >
                            <Paper
                                elevation={2}
                                sx={{
                                    overflow: 'hidden',
                                    borderRadius: 2,
                                    boxShadow: theme.shadows[5],
                                }}
                            >
                                <Box
                                    component="img"
                                    src={anime.images.jpg.large_image_url}
                                    alt={anime.title}
                                    sx={{
                                        width: '100%',
                                        height: 'auto',
                                        display: 'block',
                                    }}
                                />
                            </Paper>
                            {anime.trailer?.url && (<Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
                                <Button fullWidth variant="contained" href={anime.trailer?.url}
                                    target="_blank" startIcon={<Play />}>Watch Trailer</Button>
                            </Grid>)}

                        </Grid>

                        <Grid size={{ xs: 12, md: 8, lg: 9 }}>
                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                                    {anime.title}
                                </Typography>

                                <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" sx={{ mb: 3 }}>
                                    <Chip
                                        label={anime.status}
                                        color={anime.airing ? 'warning' : 'success'}
                                        size={isMobile ? 'small' : 'medium'}
                                    />
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Star size={18} />
                                        <Typography variant="body2">
                                            {anime.score ? anime.score : "0"} / 10
                                        </Typography>
                                    </Box>
                                </Stack>

                                <Typography variant="body1">
                                    {anime.synopsis}
                                </Typography>

                                <Grid container spacing={3} sx={{ mt: 2 }}>
                                    <Grid size={{ xs: 12, sm: 6, md: 4 }} >
                                        <Paper variant="outlined" sx={{ p: 2, textAlign: 'left' }}>
                                            <Grid container direction="row" alignItems="center" justifyContent="left" >
                                                <Calendar size={24} style={{ marginBottom: 8, marginRight: 10 }} />
                                                <Grid container direction="column">
                                                    <Typography variant="subtitle2" fontWeight="bold">Aired</Typography>
                                                    <Typography variant="body2" color="text.secondary" >
                                                        {anime.aired.from ? new Date(anime.aired.from).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'} to {anime.aired.to ? new Date(anime.aired.to).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                        <Paper variant="outlined" sx={{ p: 2, textAlign: 'left' }}>
                                            <Grid container direction="row" alignItems="center" justifyContent="left" >
                                                <Film size={24} style={{ marginBottom: 8, marginRight: 10 }} />
                                                <Grid container direction="column">
                                                    <Typography variant="subtitle2" fontWeight="bold">Episodes</Typography>
                                                    <Typography variant="body2" color="text.secondary" >
                                                        {anime.episodes || 'N/A'}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                        <Paper variant="outlined" sx={{ p: 2, textAlign: 'left' }}>
                                            <Grid container direction="row" alignItems="center" justifyContent="left" >
                                                <Clock size={24} style={{ marginBottom: 8, marginRight: 10 }} />
                                                <Grid container direction="column">
                                                    <Typography variant="subtitle2" fontWeight="bold">Duration</Typography>
                                                    <Typography variant="body2" color="text.secondary" >
                                                        {anime.duration || 'N/A'}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                        <Paper variant="outlined" sx={{ p: 2, textAlign: 'left' }}>
                                            <Grid container direction="row" alignItems="center" justifyContent="left" >
                                                <Trophy size={24} style={{ marginBottom: 8, marginRight: 10 }} />
                                                <Grid container direction="column">
                                                    <Typography variant="subtitle2" fontWeight="bold">Rank</Typography>
                                                    <Typography variant="body2" color="text.secondary" >
                                                        #{anime.rank || 'N/A'}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                        <Paper variant="outlined" sx={{ p: 2, textAlign: 'left' }}>
                                            <Grid container direction="row" alignItems="center" justifyContent="left" >
                                                <Users size={24} style={{ marginBottom: 8, marginRight: 10 }} />
                                                <Grid container direction="column">
                                                    <Typography variant="subtitle2" fontWeight="bold">Members</Typography>
                                                    <Typography variant="body2" color="text.secondary" >
                                                        {anime.members?.toLocaleString() || 'N/A'}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                        <Paper variant="outlined" sx={{ p: 2, textAlign: 'left' }}>
                                            <Grid container direction="row" alignItems="center" justifyContent="left" >
                                                <Heart size={24} style={{ marginBottom: 8, marginRight: 10 }} />
                                                <Grid container direction="column">
                                                    <Typography variant="subtitle2" fontWeight="bold">Favorites</Typography>
                                                    <Typography variant="body2" color="text.secondary" >
                                                        {anime.favorites?.toLocaleString() || 'N/A'}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                </Grid>

                                {anime.studios.length > 0 && (<Box sx={{ mt: 4 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Studios
                                    </Typography>
                                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                        {anime.studios.map((studio) => (
                                            <Chip
                                                key={studio.name}
                                                label={studio.name}
                                                variant="outlined"
                                                sx={{ mb: 1 }}
                                            />
                                        ))}
                                    </Stack>
                                </Box>)}
                                {anime.producers.length > 0 && (<Box sx={{ mt: 4 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Producers
                                    </Typography>
                                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                        {anime.producers.map((producer) => (
                                            <Chip
                                                key={producer.name}
                                                label={producer.name}
                                                variant="outlined"
                                                sx={{ mb: 1 }}
                                            />
                                        ))}
                                    </Stack>
                                </Box>)}
                                {anime.genres.length > 0 && (<Box sx={{ mt: 4 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Genres
                                    </Typography>
                                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                        {anime.genres.map((genre) => (
                                            <Chip
                                                key={genre.name}
                                                label={genre.name}
                                                variant="outlined"
                                                sx={{ mb: 1 }}
                                            />
                                        ))}
                                    </Stack>
                                </Box>)}
                                {anime.themes.length > 0 && (<Box sx={{ mt: 4 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Themes
                                    </Typography>
                                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                        {anime.themes.map((theme) => (
                                            <Chip
                                                key={theme.name}
                                                label={theme.name}
                                                variant="outlined"
                                                sx={{ mb: 1 }}
                                            />
                                        ))}
                                    </Stack>
                                </Box>)}
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default DetailsPage;