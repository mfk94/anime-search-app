import { Container, Grid, Pagination, Box, Typography } from "@mui/material";
import AnimeCard from "../components/AnimeCard";
import SearchBar from "../components/SearchBar";
import { useAnimeSearch } from "../hooks";
import { useNavigation } from "../hooks";

const MainPage = () => {
  const {
    filters,
    animes,
    page,
    totalPages,
    loading,
    error,
    handleFilterChange,
    handlePageChange,
  } = useAnimeSearch();
  const { goToAnimeDetails } = useNavigation();

  // Create skeleton array for loading state
  const skeletonArray = Array(24).fill(null);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 1,
          }}
        >
          Discover Anime
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Browse through our collection of anime series and movies
        </Typography>

        <SearchBar filters={filters} onFilterChange={handleFilterChange} />
      </Box>

      {error && (
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {(loading ? skeletonArray : animes).map((anime, index) => (
          <Grid
            key={loading ? index : anime.mal_id}
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
          >
            <AnimeCard
              anime={anime}
              onClick={() => goToAnimeDetails(anime.mal_id)}
              isLoading={loading}
            />
          </Grid>
        ))}
      </Grid>

      {!loading && !error && animes.length === 0 && (
        <Typography align="center" sx={{ mt: 4 }}>
          No anime found. Try adjusting your search filters.
        </Typography>
      )}

      {!loading && !error && animes.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </Container>
  );
};

export default MainPage;
