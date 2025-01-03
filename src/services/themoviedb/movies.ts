import { axiosInstance } from "helpers/axios";
import { TvDetailsData } from "interfaces/themoviedb";

//interfaces
import {
  GenresData,
  MovieDetailsData,
  PopularData,
} from "interfaces/themoviedb/movies";

export async function getGenreMoviesAPI() {
  const { data } = await axiosInstance.get<GenresData>(
    `/genre/movie/list?language=es`
  );
  return data;
}

export async function getGenreTvAPI(){
  const { data } = await axiosInstance.get<GenresData>(
    `/genre/tv/list?language=es`
  );
  return data;
}

export async function getPopularMoviesAPI() {
  const { data } = await axiosInstance.get<PopularData>(
    `/discover/movie?sort_by=popularity.desc&language=es`
  );
  return data;
}

export async function getTrendingMoviesAPI(validTime: "day" | "week") {
  const { data } = await axiosInstance.get<PopularData>(
    `/trending/movie/${validTime}?language=es`
  );
  return data;
}

export async function getMoviesAPI() {
  const { data } = await axiosInstance.get<PopularData>(
    `/discover/movie?language=es&page=1`
  );
  return data;
}

export async function geTvAPI() {
  const { data } = await axiosInstance.get<PopularData>(
    `/discover/tv?language=es&page=1`
  );
  return data;
}

export async function getRelatedMoviesAPI(id: string) {
  const { data } = await axiosInstance.get<PopularData>(
    `/movie/${id}/similar?language=es`
  );
  return data;
}

export async function getRelatedTvAPI(id: string) {
  const { data } = await axiosInstance.get<PopularData>(
    `/tv/${id}/similar?language=es`
  );
  return data;
}

export async function searchMovieAPI(query: string) {
  const { data } = await axiosInstance.get<PopularData>(
    `/search/movie?query=${query}&language=es`
  );
  return data;
}

export async function searchTvAPI(query: string) {
  const { data } = await axiosInstance.get<PopularData>(
    `/search/tv?query=${query}&language=es`
  );
  return data;
}

export async function getMovieDetailsAPI(id: string) {
  const { data } = await axiosInstance.get<MovieDetailsData>(
    `/movie/${id}?language=es&append_to_response=videos`
  );
  return data;
}

export async function getTvDetailsAPI(id: string) {
  const { data } = await axiosInstance.get<TvDetailsData>(
    `/tv/${id}?language=es&append_to_response=videos`
  );
  return data;
}

export async function getFavoriteMoviesAPI(username: string) {
  const { data } = await axiosInstance.get<PopularData>(
    `account/${username}/favorite/movies?language=es&sort_by=created_at.desc`
  );
  return data;
}

export async function getFavoriteTvAPI(username: string) {
  const { data } = await axiosInstance.get<PopularData>(
    `account/${username}/favorite/tv?language=es&sort_by=created_at.desc`
  );
  return data;
}

export async function addFavoriteAPI(
  username: string,
  media_type: "movie" | "tv",
  media_id: string,
  favorite: boolean
) {
  const { data } = await axiosInstance.post(`/account/${username}/favorite`, {
    media_type: media_type,
    media_id: media_id,
    favorite: favorite,
  });
  return data;
}
