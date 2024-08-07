"use client";

//servies
import { getFavoriteMoviesAPI, getFavoriteTvAPI } from "services/themoviedb";

//hooks
import { useUserContext } from "hooks/useUserContext";

import { Container, Title, Tabs, SimpleGrid } from "@mantine/core";
import { SkeletonMovieCard, MovieCard } from "components/MovieCard";
import { Movie } from "interfaces/themoviedb";
import { useEffect, useState } from "react";

export function Content() {
  const [typeMedia, setTypeMedia] = useState<string | null>("movies");

  const { favoriteMovies, favoriteTvs } = useUserContext();

  return (
    <Container size="xl">
      <Title
        order={2}
        className="title"
        style={{ textAlign: "left", marginTop: "20px" }}
      >
        Tus favoritos
      </Title>
      <Tabs value={typeMedia} onChange={setTypeMedia}>
        <Tabs.List>
          <Tabs.Tab value="movies">Películas</Tabs.Tab>
          <Tabs.Tab value="tvs">Series</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="movies">
          <SimpleGrid
            cols={{ base: 2, sm: 3, md: 4, lg: 5 }}
            spacing={{ base: 10, sm: "xl" }}
            verticalSpacing={{ base: "md", sm: "xl" }}
            style={{ marginTop: "20px" }}
          >
            {favoriteMovies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </SimpleGrid>
        </Tabs.Panel>
        <Tabs.Panel value="tvs">
          <SimpleGrid
            cols={{ base: 2, sm: 3, md: 4, lg: 5 }}
            spacing={{ base: 10, sm: "xl" }}
            verticalSpacing={{ base: "md", sm: "xl" }}
            style={{ marginTop: "20px" }}
          >
            {favoriteTvs.map((tv) => (
              <MovieCard movie={tv} key={tv.id} />
            ))}
          </SimpleGrid>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}
