//components
import { Box, Container, Image, Title, Text, Rating } from "@mantine/core";

//styles
import classes from "./Banner.module.css";
import { TvDetailsData } from "interfaces/themoviedb";
import { urlImageW300, urlImageW1900 } from "helpers/images";
import { ButtonVideoPlayer } from "components/MovieCard";

//interfaces
interface BannerProps {
  movie: TvDetailsData;
}

export function Banner({ movie }: BannerProps) {
  return (
    <Container size={"xl"}>
      <Box
        className={classes.banner}
        style={{
          backgroundImage: `url(${urlImageW1900(movie?.backdrop_path)})`,
        }}
      >
        <Box className={classes.banner__container}>
          <Container size={"xl"} className={classes.container}>
            <Box className={classes.container_principal_image}>
              <Image
                src={urlImageW300(movie?.poster_path)}
                alt={movie.name}
                className={classes.banner__image}
              ></Image>
            </Box>
            <Box>
              <Box className={classes.banner__content} mb={"md"}>
                <Box className={classes.banner__title}>
                  <Title order={1} c={"white"}>
                    {movie.name}
                  </Title>
                </Box>
                <Box>
                  <Box className={classes.banner_info_date}>
                    {movie.adult ? "+18" : "+13"} | {movie.first_air_date} |{" "}
                    {movie.genres.map((gen, index) => (
                      <span key={gen.id}>
                        {gen.name}
                        {index < movie.genres.length - 1 ? ", " : "."}
                      </span>
                    ))}
                  </Box>
                </Box>
                <Box>
                  <Text mt={"1rem"} style={{ color: "white" }}>
                    {movie.vote_count} Votos
                  </Text>
                  <Rating
                    count={10}
                    defaultValue={0}
                    value={movie.vote_average}
                  />
                </Box>
                <Box mb={"md"}>
                  <Text mt={"1rem"} style={{ color: "white" }} size="xs">
                    {movie.tagline}
                  </Text>
                </Box>
                <Box className={classes.banner__description}>
                  <Text c={"white"} fw={"bold"}>
                    Vista general
                  </Text>
                  <Text c={"white"}>{movie.overview}</Text>
                </Box>
              </Box>
              <ButtonVideoPlayer movie={movie} />
            </Box>
          </Container>
        </Box>
      </Box>
    </Container>
  );
}
