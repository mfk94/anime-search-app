import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Rating,
  Stack,
  Skeleton,
} from "@mui/material";
import { Flame, CheckCircle, Clock } from "lucide-react";
import { Anime } from "../types/anime";
import { useResponsive } from '../hooks';

interface AnimeCardProps {
  anime: Anime;
  onClick: (anime: Anime) => void;
  isLoading?: boolean;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onClick, isLoading = false }) => {
  const { isMobile } = useResponsive();

  const getStatus = (
    status: string | undefined,
    airing: boolean | undefined
  ): "Airing" | "Finished" | "Upcoming" => {
    if (airing) return "Airing";
    if (status === "Not yet aired") return "Upcoming";
    return "Finished";
  };

  const animeStatus = !isLoading ? getStatus(anime.status, anime.airing) : "Finished";

  // Status icon mapping
  const statusIcons = {
    Airing: <Flame size={16} />,
    Finished: <CheckCircle size={16} />,
    Upcoming: <Clock size={16} />,
  };

  // Status color mapping
  const statusColors = {
    Airing: "warning",
    Finished: "success",
    Upcoming: "info",
  };

  if (isLoading) {
    return (
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          transition: "transform 0.2s",
          "&:hover": {
            transform: "scale(1.02)",
          },
        }}
      >
        <Skeleton
          variant="rectangular"
          height={isMobile ? 200 : 300}
          animation="wave"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Skeleton variant="text" height={32} animation="wave" />
          <Box sx={{ mt: 1 }}>
            <Skeleton variant="text" width="60%" animation="wave" />
            <Skeleton variant="text" width="40%" animation="wave" />
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      onClick={() => onClick(anime)}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      <CardActionArea
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          height: "100%",
        }}
      >
        <Box
          sx={{
            position: "relative",
            paddingTop: "56.25%",
            overflow: "hidden",
          }}
        >
          <CardMedia
            component="img"
            image={anime.images?.jpg?.large_image_url || ''}
            alt={anime.title}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <Chip
            label={animeStatus}
            size="small"
            color={statusColors[animeStatus] as "warning" | "success" | "info"}
            icon={statusIcons[animeStatus]}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              fontWeight: "bold",
            }}
          />
        </Box>

        <CardContent
          sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {anime.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 1.5,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {anime.synopsis}
          </Typography>

          <Box sx={{ mt: "auto" }}>
            <Stack direction="row" spacing={0.5} sx={{ mb: 1 }}>
              <Rating
                value={(anime.score || 0) / 2}
                precision={0.5}
                size="small"
                readOnly
              />
              <Typography variant="body2" color="text.secondary">
                {(anime.score || 0).toFixed(1)}
              </Typography>
            </Stack>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 0.5,
              }}
            >
              {anime.genres?.slice(0, 3).map((genre, index) => (
                <Chip
                  key={index}
                  label={genre.name}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: "0.7rem",
                    height: 24,
                  }}
                />
              ))}
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
              }}
            >
              <Typography variant="caption" color="text.secondary">
                {anime.year || "N/A"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {anime.episodes > 1 ? `${anime.episodes} episodes` : "Movie"}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AnimeCard;
