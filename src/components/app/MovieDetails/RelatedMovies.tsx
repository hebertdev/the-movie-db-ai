"use client";

import { useEffect, useState } from "react";

//mantineui
import { Container, SimpleGrid, Title } from "@mantine/core";
import { getRelatedMoviesAPI } from "services/themoviedb";
import { MovieCard } from "components/MovieCard/MovieCard";
import { Movie, MovieDetailsData } from "interfaces/themoviedb";
import { SkeletonMovieCard } from "components/MovieCard";

//interfaces
interface TrendingMoviesProps {
  movie: MovieDetailsData;
}

export function RelatedMovies({ movie }: TrendingMoviesProps) {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const handleGetTrendingMovies = async () => {
    try {
      setLoading(true);
      const data = await getRelatedMoviesAPI(movie.id.toString());
      setTrendingMovies(data.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetTrendingMovies();
  }, []);

  return (
    <Container size="xl">
      <Title
        order={2}
        className="title"
        style={{ textAlign: "left", marginTop: "50px" }}
      >
        Relacionados
      </Title>

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
        {trendingMovies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
