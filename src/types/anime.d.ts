export interface Anime {
  trailer: { url: string };
  themes: { name: string }[];
  studios: { name: string }[];
  producers: { name: string }[];
  favorites: string;
  duration: string;
  aired: {
    from: string;
    to: string;
  };
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
      large_image_url: string;
    };
  };
  synopsis: string;
  genres: {
    name: string;
  }[];
  score: number;
  episodes: number;
  year: number;
  status: string;
  airing: boolean;
  rank?: number;
  members?: number;
}

export type AnimeCategory = "All" | "Airing" | "Finished" | "Upcoming";

export interface SearchFilters {
  query: string;
  category: AnimeCategory;
}

export interface JikanResponse {
  data: Anime[];
  pagination: {
    has_next_page: boolean;
    current_page: number;
    last_visible_page: number;
  };
}
