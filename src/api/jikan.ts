import axios from "axios";
import { JikanResponse } from "../types/anime";

const API_BASE_URL = "https://api.jikan.moe/v4";
const API_TIMEOUT = 10000; // 10 seconds

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
});

export const fetchAllAnime = async (params) => {
  try {
    const response = await api.get<JikanResponse>("/anime", {
      params: params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all anime:", error);
    throw error;
  }
};

export const fetchAnimeDetails = async (id: number) => {
  try {
    const response = await api.get<JikanResponse>(`/anime/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching anime details:", error);
    throw error;
  }
};
