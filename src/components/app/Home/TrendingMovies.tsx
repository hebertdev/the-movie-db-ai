"use client";

import { useEffect, useState } from "react";

//mantineui
import { Container, SimpleGrid, Tabs, Title } from "@mantine/core";
import { getTrendingMoviesAPI } from "services/themoviedb";
import { MovieCard } from "components/MovieCard/MovieCard";
import { Movie } from "interfaces/themoviedb";
import { SkeletonMovieCard } from "components/MovieCard";

export function TrendingMovies() {
  const [validTime, setValidTime] = useState<string | null>("day");
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const handleGetTrendingMovies = async () => {
    try {
      setLoading(true);
      const data = await getTrendingMoviesAPI(validTime as "day" | "week");
      setTrendingMovies(data.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetTrendingMovies();
  }, [validTime]);

  return (
    <Container size="xl">
      <Title
        order={2}
        className="title"
        style={{ textAlign: "left", marginTop: "20px" }}
      >
        En tendencia
      </Title>
      <Tabs value={validTime} onChange={setValidTime}>
        <Tabs.List>
          <Tabs.Tab value="day">HOY</Tabs.Tab>
          <Tabs.Tab value="week">ESTA SEMANA</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="day">
          <SimpleGrid cols={5} spacing="xl" style={{ marginTop: "20px" }}>
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
        </Tabs.Panel>
        <Tabs.Panel value="week">
          <SimpleGrid cols={5} spacing="xl" style={{ marginTop: "20px" }}>
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
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}
