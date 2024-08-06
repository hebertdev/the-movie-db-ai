"use client";

import { useEffect } from "react";

//helpers
import { urlImageW1900 } from "helpers/images";

//hooks
import { useSimpleSearch } from "hooks/useSearch";

//components
import { ActionIcon, Box, Container } from "@mantine/core";

//styles
import classes from "./Banner.module.css";
import { Movie } from "interfaces/themoviedb";
import { IconSearch } from "@tabler/icons-react";
import { FormEvent } from "react";

interface BannerProps {
  movies: Movie[];
  tvs: Movie[];
}

export function Banner({ movies, tvs }: BannerProps) {
  const {
    handleSearch,
    loadingSearch,
    handleSetSimpleSearchText,
    simpleSearchText,
    handleSetLoadingSearch,
  } = useSimpleSearch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  };

  useEffect(() => {
    if (movies.length >= 0 || tvs.length >= 0) {
      handleSetLoadingSearch(false);
    }
  }, [movies, tvs]);

  return (
    <Container size={"xl"}>
      <Box
        className={classes.banner}
        style={{
          backgroundImage: `url(${urlImageW1900(
            movies[0]?.backdrop_path ||
              (movies.length > 1 ? movies[1]?.backdrop_path : "") ||
              (tvs.length > 0 ? tvs[0]?.backdrop_path : "")
          )})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box className={classes.banner__container}>
          <Container size={"xl"} className={classes.container}>
            <Box
              className={classes.banner_form}
              component="form"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                className={classes.input_search}
                placeholder="Buscar una película o serie de televisión."
                value={simpleSearchText}
                onChange={(e) => handleSetSimpleSearchText(e.target.value)}
              />
              <ActionIcon
                variant="subtle"
                radius="xl"
                aria-label="Settings"
                size={"xl"}
                loading={loadingSearch}
              >
                <IconSearch
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                  type="submit"
                />
              </ActionIcon>
            </Box>
          </Container>
        </Box>
      </Box>
    </Container>
  );
}
