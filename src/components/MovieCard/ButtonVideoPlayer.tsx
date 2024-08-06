"use client";

//react youtube
import YouTube from "react-youtube";

//mantineui
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlayerPlay } from "@tabler/icons-react";
import { Movie, MovieDetailsData } from "interfaces/themoviedb";
import { useState } from "react";
import { getMovieDetailsAPI, getTvDetailsAPI } from "services/themoviedb";

interface ButtonVideoPlayerProps {
  movie: any | Movie | MovieDetailsData;
}

export function ButtonVideoPlayer({ movie }: ButtonVideoPlayerProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const [trailer, setTrailer] = useState<any>(null);

  const handleGetMovieDetails = async () => {
    setLoading(true);
    try {
      const data = await getMovieDetailsAPI(movie.id.toString());
      console.log(data.videos.results);
      if (data.videos.results.length > 0) {
        const trailer = data.videos.results.filter(
          (video: any) => video.type === "Trailer"
        );
        console.log(trailer);
        setTrailer(trailer[0]);
      }

      open();
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const handleGetTvDetails = async () => {
    setLoading(true);
    try {
      const data = await getTvDetailsAPI(movie.id.toString());
      if (data.videos.results.length > 0) {
        const trailer = data.videos.results.filter(
          (video: any) => video.type === "Trailer"
        );
        setTrailer(trailer[0]);
      }
      open();
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const handleGetTrailer = async () => {
    if (movie.name) {
      handleGetTvDetails();
    } else {
      handleGetMovieDetails();
    }
  };

  return (
    <>
      <Button
        variant="outline"
        mt={10}
        leftSection={<IconPlayerPlay />}
        onClick={handleGetTrailer}
        loading={loading}
      >
        Ver trailer
      </Button>
      <Modal
        opened={opened}
        onClose={close}
        title="Trailer"
        size={"60%"}
        centered
      >
        {trailer ? (
          <YouTube
            videoId={trailer.key}
            opts={{
              width: "100%",
              height: "500",
              playerVars: {
                autoplay: 1,
                controls: 1,
                cc_load_policy: 0,
                fs: 0,
                iv_load_policy: 0,
                modestbranding: 0,
                rel: 0,
                showinfo: 0,
              },
            }}
          />
        ) : (
          "Por el momento no tiene trailer"
        )}
      </Modal>
    </>
  );
}
