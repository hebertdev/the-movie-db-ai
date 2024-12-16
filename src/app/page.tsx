import { Metadata } from "next";
import { getTrendingMoviesAPI } from "services/themoviedb";
import {
  Banner,
  PopularMovies,
  MovieGenre,
  TrendingMovies,
} from "components/app/Home";
import { urlImageW1900 } from "helpers/images";

// Revalidar cada 24 horas (86400 segundos)
export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getTrendingMoviesAPI("day");
  
  const firstMovie = data.results[0];
  const url_image = firstMovie ? urlImageW1900(firstMovie.backdrop_path) : "";

  return {
    title: "TheMovieDB AI | Hebertdev",
    description: "Encuentra Películas con IA: Descubre películas personalizadas, busca títulos olvidados con detalles clave y recibe recomendaciones basadas en tus favoritos. ¡Explora tu próximo film ideal ahora!",
    openGraph: {
      title: "TheMovieDB AI | Hebertdev",
      description: "Encuentra Películas con IA: Descubre películas personalizadas, busca títulos olvidados con detalles clave y recibe recomendaciones basadas en tus favoritos. ¡Explora tu próximo film ideal ahora!",
      images: url_image ? [url_image] : [],
    },
  };
}

export default async function HomePage() {
  const data = await getTrendingMoviesAPI("day");

  return (
    <>
      <Banner data={data} />
      <PopularMovies />
      <br />
      <TrendingMovies />
      <br />
      <MovieGenre />
      <br />
    </>
  );
}