"use client";

import { useState, useEffect } from "react";

//mantineui
import { Container, SimpleGrid, Tabs, Title } from "@mantine/core";
import { MovieCard } from "components/MovieCard/MovieCard";
import { Movie } from "interfaces/themoviedb";

interface TrendingMoviesProps {
  movies: Movie[];
  tvs: Movie[];
}

export function Results({ movies, tvs }: TrendingMoviesProps) {
  const [type, setType] = useState<string | null>("movies");

  useEffect(() => {
    if (movies?.length != 0) {
      setType("movies");
    } else {
      setType("tvs");
    }
  }, [movies, tvs]);

  return (
    <Container size="xl">
      <Title
        order={1}
        className="title"
        style={{ textAlign: "left", marginTop: "20px", marginBottom: "5px" }}
      >
        Resultados
      </Title>
      <Tabs value={type} onChange={setType}>
        <Tabs.List>
          <Tabs.Tab value="movies">Películas {`(${movies?.length})`} </Tabs.Tab>
          <Tabs.Tab value="tvs">Series {`(${tvs?.length})`}</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="movies">
          <SimpleGrid cols={5} spacing="xl" style={{ marginTop: "20px" }}>
            {movies?.length != 0 ? (
              <>
                {movies.map((movie) => (
                  <MovieCard movie={movie} key={movie.id} />
                ))}
              </>
            ) : (
              <p>No hay resultados</p>
            )}
          </SimpleGrid>
        </Tabs.Panel>
        <Tabs.Panel value="tvs">
          <SimpleGrid cols={5} spacing="xl" style={{ marginTop: "20px" }}>
            {tvs?.length != 0 ? (
              <>
                {tvs.map((movie) => (
                  <MovieCard movie={movie} key={movie.id} />
                ))}
              </>
            ) : (
              <p>No hay resultados</p>
            )}
          </SimpleGrid>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}
