"use client";

import { useEffect } from "react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Modal, Button, SimpleGrid, useMantineTheme } from "@mantine/core";
import { MovieCard } from "components/MovieCard/MovieCard";

//interface

interface ButtonModalRecommendationProps {
  modifiedAiResponse: {
    ai_message: string;
    movies: any[];
    error: boolean;
  } | null;
  loading: boolean;
  handleGenerate: () => void;
  handleClearRecommendation: () => void;
}

export function ButtonModalRecommendation({
  modifiedAiResponse,
  loading,
  handleGenerate,
  handleClearRecommendation,
}: ButtonModalRecommendationProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  useEffect(() => {
    if (modifiedAiResponse) {
      open();
    }
  }, [modifiedAiResponse]);

  const handleCloseModal = () => {
    handleClearRecommendation();
    close();
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={handleCloseModal}
        title={"✨" + modifiedAiResponse?.ai_message}
        size={mobile ? "100%" : "90%"}
      >
        <span>
          <small>
            <small>
              ⚠ Solo podemos ofrecerte busquedas de películas con fecha de
              estreno hasta mediados del 2023
            </small>
          </small>
        </span>
        <SimpleGrid
          cols={{ base: 2, sm: 3, md: 4, lg: 5 }}
          spacing={{ base: 10, sm: "xl" }}
          verticalSpacing={{ base: "md", sm: "xl" }}
          style={{ marginTop: "20px" }}
        >
          {modifiedAiResponse?.movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} trailer={true} />
          ))}
        </SimpleGrid>
      </Modal>
      <Button onClick={handleGenerate} loading={loading}>
        A darle!
      </Button>
    </>
  );
}
