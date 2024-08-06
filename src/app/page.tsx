//components
import {
  Banner,
  PopularMovies,
  MovieGenre,
  TrendingMovies,
} from "components/app/Home";

export const metadata = {
  title: "TheMovieDB AI | Hebertdev",
  description: `Encuentra Películas con IA: Descubre películas personalizadas, busca
            títulos olvidados con detalles clave y recibe recomendaciones
            basadas en tus favoritos. ¡Explora tu próximo film ideal ahora!`,
};

export default function HomePage() {
  return (
    <>
      <Banner />
      <PopularMovies />
      <br />
      <TrendingMovies />
      <br />
      <MovieGenre />
      <br />
    </>
  );
}
