"use client";

import { useEffect, useState } from "react";

//actions
import { forYouAI } from "app/actions/foryou";

//mantineui
import { Center, Container, SimpleGrid, Text, Title } from "@mantine/core";
import { MovieCard, SkeletonMovieCard } from "components/MovieCard";
import { useUserContext } from "hooks/useUserContext";
import { searchMovieAPI, searchTvAPI } from "services/themoviedb";
import { Movie } from "interfaces/themoviedb";

export function Banner() {
  const { favoriteMovies, favoriteTvs } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [myFavorites, setMyFavorites] = useState<any | null>(null);

  const [modifiedResponse, setModifiedResponse] = useState<any>({
    ai_message: "",
    categories: [],
  });

  const handleGetFirstMovies = () => {
    const newArray = favoriteMovies.slice(0, 5).map((movie) => ({
      title: movie.title,
      release_date: movie.release_date,
    }));
    setMyFavorites((prev: any) => ({ ...prev, movies: newArray }));
  };

  const handleGetFirstTvs = () => {
    const newArray = favoriteTvs.slice(0, 5).map((tv) => ({
      title: tv.title,
      release_date: tv.first_air_date,
    }));
    setMyFavorites((prev: any) => ({ ...prev, tvs: newArray }));
  };

  useEffect(() => {
    handleGetFirstMovies();
    handleGetFirstTvs();
  }, []);

  const handleGetRecommendations = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const result = await forYouAI(JSON.stringify(myFavorites));
      if (result) {
        for (let i = 0; i < result.categories.length; i++) {
          let categorie = result.categories[i];
          let movies: any = [];
          for (const movie of categorie.movies) {
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
                movies.push(firstResult);
              }
            } catch (error) {
              console.error("Error fetching movie or TV:", error);
            }
          }
          categorie.movies = movies;
          const new_category = categorie;
          setModifiedResponse((prevState: any) => ({
            ...prevState,
            categories: [...prevState.categories, new_category],
          }));
        }
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (myFavorites) {
      handleGetRecommendations();
    }
  }, [myFavorites]);

  return (
    <Container size="xl">
      <Center>
        <Title
          order={2}
          className="title"
          style={{ textAlign: "left", marginTop: "50px", marginBottom: "10px" }}
        >
          Aquí tienes algunas recomendaciones para ti
        </Title>
      </Center>
      <Center>
        <Text>
          Estas recomendaciones se basan en tus preferencias y en las últimas
          películas y series que has marcado como favoritas en tu perfil
        </Text>
      </Center>

      {modifiedResponse.categories.map((category: any, index: number) => (
        <>
          <Title order={3} style={{ textAlign: "left" }}>
            {category.category}
          </Title>
          <SimpleGrid
            key={index}
            cols={{ base: 2, sm: 3, md: 4, lg: 5 }}
            spacing={{ base: 10, sm: "xl" }}
            verticalSpacing={{ base: "md", sm: "xl" }}
            style={{ marginTop: "20px" }}
            mb={"xl"}
          >
            {category.movies.map((movie: Movie, index: number) => (
              <MovieCard key={movie.id} movie={movie} trailer />
            ))}
          </SimpleGrid>
        </>
      ))}

      <SimpleGrid
        cols={{ base: 2, sm: 3, md: 4, lg: 5 }}
        spacing={{ base: 10, sm: "xl" }}
        verticalSpacing={{ base: "md", sm: "xl" }}
        style={{ marginTop: "20px" }}
      >
        {loading && (
          <>
            {[...Array(10)].map((_, index) => (
              <SkeletonMovieCard key={index} />
            ))}
          </>
        )}
      </SimpleGrid>
    </Container>
  );
}
