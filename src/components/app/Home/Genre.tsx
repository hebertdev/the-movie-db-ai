"use client";

import { useEffect, useState } from "react";

//services
import { getGenreMoviesAPI, getGenreTvAPI } from "services/themoviedb";

//mantineui
import {
  Container,
  SimpleGrid,
  Card,
  Group,
  Text,
  Avatar,
  rem,
  Title,
  SegmentedControl,
  Center,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

//interfaces
import { Genre } from "interfaces/themoviedb";

export function MovieGenre() {
  const [value, setValue] = useState("movie");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [genresTv, setGenresTv] = useState<Genre[]>([]);

  const handleGetMovieGenres = async () => {
    try {
      const data = await getGenreMoviesAPI();
      setGenres(data.genres);
    } catch (e) {
      console.log(e);
    }
  };

  const handleGetTvGenres = async () => {
    try {
      const data = await getGenreTvAPI();
      setGenresTv(data.genres);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleGetMovieGenres();
    handleGetTvGenres();
  }, []);

  return (
    <Container size={"xl"}>
      <Title
        order={2}
        className="title"
        style={{ marginTop: "20px",  }}
        mb={"md"}
      >
        Géneros
      </Title>
      <Center>
        <SegmentedControl
          mb={"lg"}
          value={value}
          onChange={setValue}
          data={[
            { label: "Películas", value: "movie" },
            { label: "Series", value: "tv" },
          ]}
        />
      </Center>
      {value === "movie" ? (
        <SimpleGrid
          cols={{ base: 2, sm: 3, md: 4, lg: 5 }}
          spacing={{ base: 10, sm: "xl" }}
          verticalSpacing={{ base: "md", sm: "xl" }}
        >
          {genres.map((genre) => (
            <GenreCard key={genre.id} genre={genre} />
          ))}
        </SimpleGrid>
      ) : (
        <SimpleGrid
          cols={{ base: 2, sm: 3, md: 4, lg: 5 }}
          spacing={{ base: 10, sm: "xl" }}
          verticalSpacing={{ base: "md", sm: "xl" }}
        >
          {genresTv.map((genre) => (
            <GenreCard key={genre.id} genre={genre} />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
}

interface GenreCardProps {
  genre: Genre;
}

function GenreCard({ genre }: GenreCardProps) {
  const generateColor = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let j = 0; j < 3; j++) {
      const value = (hash >> (j * 8)) & 0xff;
      color += ("00" + value.toString(16)).substr(-2);
    }
    color += "30";
    return color;
  };

  const color = generateColor(genre.name);

  return (
    <Card radius={"md"} bg={color}>
      <Group>
        <Avatar radius="xl">{genre.name[0]}</Avatar>

        <div style={{ flex: 1 }}>
          <Text size="xs" fw={400}>
            {genre.name}
          </Text>
        </div>
        <IconChevronRight
          style={{ width: rem(12), height: rem(12) }}
          stroke={1.5}
        />
      </Group>
    </Card>
  );
}
