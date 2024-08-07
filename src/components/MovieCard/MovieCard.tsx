"use client";

import Link from "next/link";

//interfaces
import { Movie } from "interfaces/themoviedb";

//helpers
import { urlImageW300 } from "helpers/images";
import { slugGenerator } from "helpers/slug";

//services
import { addFavoriteAPI } from "services/themoviedb";

//components
import { ButtonVideoPlayer } from "components/MovieCard";

//mantineui
import {
  Card,
  Text,
  Image,
  Rating,
  Center,
  Pill,
  ActionIcon,
  Box,
  useMantineTheme,
} from "@mantine/core";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";

//styles
import classes from "./MovieCard.module.css";
import { useUserContext } from "hooks/useUserContext";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";

interface MovieCardProps {
  movie: Movie;
  trailer?: boolean;
}

export function MovieCard({ movie, trailer = false }: MovieCardProps) {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const [typeMedia, setTypeMedia] = useState<"serie" | "movie">("movie");
  const { user } = useUserContext();
  useEffect(() => {
    if (movie.title) {
      setTypeMedia("movie");
    } else {
      setTypeMedia("serie");
    }
  }, [movie]);
  return (
    <Card
      shadow="sm"
      padding="md"
      style={{
        position: "relative",
      }}
    >
      <Card.Section
        component={Link}
        href={`${
          typeMedia === "movie" ? `/movies/` : `/series/`
        }${slugGenerator(movie.name ? movie.name : movie.title)}/${movie.id}`}
      >
        <Image
          src={movie.poster_path ? urlImageW300(movie.poster_path) : null}
          h={mobile ? "320px" : "350px"}
          alt={movie.name ? movie.name : movie.title}
          fallbackSrc={`https://placehold.co/600x400?text=${
            movie.name ? movie.name[0] : movie.title[0]
          }`}
        />
      </Card.Section>
      {user && (
        <Box className={classes.liked_button_container}>
          <span />
          <LikeButton movieId={movie.id} typeMedia={typeMedia} />
        </Box>
      )}

      <Center>
        <Rating
          count={10}
          defaultValue={0}
          value={movie.vote_average}
          mt={"1rem"}
          size={"xs"}
        />
      </Center>

      <Text fw={500} size="md" mt="md">
        {movie.name ? movie.name : movie.title}
      </Text>

      <Center>
        <Text mt="xs" c="dimmed" size="sm">
          {movie?.release_date ? movie?.release_date : movie?.first_air_date}
        </Text>
      </Center>
      <Center>
        <Pill size="xs" mt={"xs"}>
          {typeMedia}
        </Pill>
      </Center>
      {trailer && <ButtonVideoPlayer movie={movie} />}
    </Card>
  );
}

interface LikeButtonProps {
  movieId: number;
  typeMedia: "movie" | "serie";
}

function LikeButton({ movieId, typeMedia }: LikeButtonProps) {
  const {
    user,
    favoriteMovies,
    favoriteTvs,
    handleGetFavoriteMovies,
    handleGetFavoriteTvs,
  } = useUserContext();
  const [liked, setLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (typeMedia === "movie") {
      setLiked(favoriteMovies.some((movie) => movie.id === movieId));
    } else if (typeMedia === "serie") {
      setLiked(favoriteTvs.some((tv) => tv.id === movieId));
    }
  }, [favoriteMovies, favoriteTvs, movieId, typeMedia]);

  const handleAddFavorite = async () => {
    if (loading) return;
    if (!user) return;
    try {
      setLoading(true);
      if (typeMedia === "movie") {
        await addFavoriteAPI(
          user.username,
          "movie",
          movieId.toString(),
          !liked
        );
        setLiked(!liked);
        handleGetFavoriteMovies();
      } else {
        await addFavoriteAPI(user.username, "tv", movieId.toString(), !liked);
        setLiked(!liked);
        handleGetFavoriteTvs();
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <ActionIcon
      className={classes.btn_heart}
      color="orange"
      variant="subtle"
      size="lg"
      onClick={handleAddFavorite}
    >
      {liked ? (
        <IconHeartFilled color="orange" width="80%" height="80%" />
      ) : (
        <IconHeart color="orange" width="80%" height="80%" />
      )}
    </ActionIcon>
  );
}
