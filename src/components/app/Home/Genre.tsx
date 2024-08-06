"use client";

import { useEffect, useState } from "react";

//services
import { getGenreMoviesAPI } from "services/themoviedb";

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
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

//interfaces
import { Genre } from "interfaces/themoviedb";

export function MovieGenre() {
  const [genres, setGenres] = useState<Genre[]>([]);

  const handleGetMovieGenres = async () => {
    try {
      const data = await getGenreMoviesAPI();
      setGenres(data.genres);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleGetMovieGenres();
  }, []);

  return (
    <Container size={"xl"}>
      <Title order={2} className="title" style={{ marginTop: "20px" }}>
        Categorías
      </Title>
      <SimpleGrid cols={5}>
        {genres.map((genre) => (
          <GenreCard key={genre.id} genre={genre} />
        ))}
      </SimpleGrid>
    </Container>
  );
}

interface GenreCardProps {
  genre: Genre;
}

function GenreCard({ genre }: GenreCardProps) {
  // Función para generar un color hexadecimal brillante basado en el nombre del género
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

    // Agregar opacidad del 40% (66 en hexadecimal) al color generado
    color += "30"; // Aquí se agrega la opacidad al final de la cadena hexadecimal

    return color;
  };

  const color = generateColor(genre.name);

  return (
    <Card radius={"md"} bg={color}>
      <Group>
        <Avatar radius="xl">{genre.name[0]}</Avatar>

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {genre.name}
          </Text>
        </div>

        {/* Supongo que IconChevronRight es un componente de ícono que se importa */}
        <IconChevronRight
          style={{ width: rem(14), height: rem(14) }}
          stroke={1.5}
        />
      </Group>
    </Card>
  );
}
