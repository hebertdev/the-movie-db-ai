import { Carousel } from "@mantine/carousel";
import { Box, Avatar, rem, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { MovieCard } from "components/MovieCard";
import { Movie } from "interfaces/themoviedb";

//styles
import classes from "./ButtonModalDescriptiveSearch.module.css";

interface MessageProps {
  message: string;
}

export function MessageLeft({ message }: MessageProps) {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  let content_object = JSON.parse(message);
  return (
    <Box
      style={{
        display: "flex",
      }}
    >
      <Avatar>F</Avatar>
      <Box
        style={{
          width: "auto",
          boxSizing: "border-box",
          padding: " 0",
          display: "inline-grid",
        }}
      >
        <Box
          className={classes.message_left_container}
          style={{
            position: "relative",
            marginLeft: "5px",
            marginBottom: "10px",
            padding: "10px",
            textAlign: "left",
            borderRadius: "15px",
            width: "100%",
            overflow: "auto",
          }}
        >
          <Box
            style={{
              wordWrap: "break-word",
              whiteSpace: "pre-wrap",
              overflowWrap: "anywhere",
              fontSize: "14px",
            }}
          >
            {content_object.ai_message}
          </Box>
        </Box>
        {content_object.movies && (
          <>
            <Box
              style={{
                width: "100%",
                overflow: "hidden",
                marginBottom: "10px",
              }}
            >
              <Carousel
                slideSize={{ base: "10%", xs: "50%", sm: "30%", md: "40%" }}
                slideGap={{ base: rem(10), sm: "xl" }}
                align="start"
                slidesToScroll={mobile ? 1 : 2}
              >
                <>
                  {content_object.movies.map((movie: Movie) => (
                    <Carousel.Slide key={movie.id}>
                      <MovieCard movie={movie} trailer />
                    </Carousel.Slide>
                  ))}
                </>
              </Carousel>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export function MessageRight({ message }: MessageProps) {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Box
        style={{
          position: "relative",
          marginBottom: "10px",
          padding: "10px",
          //backgroundColor: "#e8f4e8",
          backgroundColor: "orange",
          color: "white",
          // width: "70%",
          marginLeft: "40px",
          textAlign: "left",
          font: "400 .9em 'Open Sans', sans-serif",
          border: "1px solid rgba(0,0,0,.05)",
          borderRadius: "15px",
        }}
      >
        <Box
          style={{
            wordWrap: "break-word",
            whiteSpace: "pre-wrap",
            overflowWrap: "anywhere",
            fontSize: "14px",
          }}
        >
          {message}
        </Box>
      </Box>
    </Box>
  );
}
