"use client";

import { useState, useEffect } from "react";

import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { useMantineTheme, rem } from "@mantine/core";

import { MovieCard } from "components/MovieCard/MovieCard";
import { Movie } from "interfaces/themoviedb";
import { getPopularMoviesAPI } from "services/themoviedb";
import { SkeletonMovieCard } from "components/MovieCard";

export function CardsCarousel() {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const handleGetPopularMovies = async () => {
    try {
      const data = await getPopularMoviesAPI();
      setPopularMovies(data.results);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetPopularMovies();
  }, []);

  return (
    <Carousel
      slideSize={{ base: "100%", sm: "50%", md: "20%" }}
      slideGap={{ base: rem(2), sm: "xl" }}
      align="start"
      slidesToScroll={mobile ? 1 : 2}
      loop
    >
      {loading && (
        <>
          {[...Array(10)].map((_, index) => (
            <Carousel.Slide key={index}>
              <SkeletonMovieCard />
            </Carousel.Slide>
          ))}
        </>
      )}

      {popularMovies.map((movie) => (
        <Carousel.Slide key={movie.id}>
          <MovieCard movie={movie} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
