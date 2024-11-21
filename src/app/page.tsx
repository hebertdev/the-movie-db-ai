import { Metadata } from "next";
import { getTrendingMoviesAPI } from "services/themoviedb";
import {
  Banner,
  PopularMovies,
  MovieGenre,
  TrendingMovies,
} from "components/app/Home";
import { urlImageW1900 } from "helpers/images";

// Quita la exportación de `metadata` y usa solo `generateMetadata`.
export async function generateMetadata(): Promise<Metadata> {
  // Obtén los datos de las películas de tendencia
  const data = await getTrendingMoviesAPI("day");

  // Extrae la primera imagen de la lista de resultados
  const firstMovie = data.results[0];
  const url_image = firstMovie ? urlImageW1900(firstMovie.backdrop_path) : "";

  return {
    title: "TheMovieDB AI | Hebertdev",
    description: `Encuentra Películas con IA: Descubre películas personalizadas, busca
            títulos olvidados con detalles clave y recibe recomendaciones
            basadas en tus favoritos. ¡Explora tu próximo film ideal ahora!`,
    openGraph: {
      title: "TheMovieDB AI | Hebertdev",
      description: `Encuentra Películas con IA: Descubre películas personalizadas, busca
            títulos olvidados con detalles clave y recibe recomendaciones
            basadas en tus favoritos. ¡Explora tu próximo film ideal ahora!`,
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
