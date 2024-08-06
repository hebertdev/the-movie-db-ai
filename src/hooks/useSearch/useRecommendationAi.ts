import { useState } from "react";
import { getMoviesAI } from "../../app/actions";

//services
import { searchMovieAPI, searchTvAPI } from "services/themoviedb/movies";
import { Movie } from "interfaces/themoviedb";

export function useRecommendationAi() {
  const [_, setAiResponse] = useState<{
    ai_message: string;
    movies: any[];
    error: boolean;
  } | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [modifiedAiResponse, setModifiedAiResponse] = useState<{
    ai_message: string;
    movies: Movie[];
    error: boolean;
  } | null>(null);

  const handleSetSearchText = (text: string) => {
    if (text.length > 120) return;
    setSearchText(text);
  };

  const handleGenerate = async () => {
    setAiResponse(null);
    if (searchText.length <= 10) return;
    if (searchText.length > 120) return;

    try {
      setLoading(true);
      const { result } = await getMoviesAI(searchText);
      setAiResponse(result);
      setModifiedAiResponse({ ...result, movies: [] });
      console.log(result);

      if (result.error == true) {
        setLoading(false);
        setSearchText("");

        return;
      } else {
        for (const movie of result.movies) {
          try {
            let data;
            let dateProperty: "release_date" | "first_air_date" =
              "release_date"; // Define las propiedades posibles

            if (movie.type === "movie") {
              data = await searchMovieAPI(movie.name);
            } else {
              data = await searchTvAPI(movie.name);
              dateProperty = "first_air_date"; // Cambia la propiedad para series de TV
            }

            // Extrae el año de la fecha de lanzamiento de la película o serie
            const movieYear = movie.release_date.split("-")[0];

            // Filtra los resultados por el año de lanzamiento
            const filteredResults = data.results.filter((item) => {
              const date = (item as any)[dateProperty]; // Usa aserción de tipo
              const itemYear = date.split("-")[0];
              return itemYear === movieYear;
            });

            // Obtiene el primer resultado del filtrado
            const firstResult = filteredResults[0];

            if (firstResult) {
              setModifiedAiResponse((prevState) => ({
                ...prevState!,
                movies: [...(prevState?.movies || []), firstResult],
              }));
            }
          } catch (error) {
            console.error("Error fetching movie or TV:", error);
          }
        }
      }
      setLoading(false);
      setSearchText("");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleClearRecommendation = () => {
    setModifiedAiResponse(null);
    setSearchText("");
    setAiResponse(null);
  };

  return {
    handleSetSearchText,
    handleGenerate,
    modifiedAiResponse,
    searchText,
    loading,
    handleClearRecommendation,
  };
}
