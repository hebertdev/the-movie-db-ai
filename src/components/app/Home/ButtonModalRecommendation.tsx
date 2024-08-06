"use client";

import { useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, SimpleGrid } from "@mantine/core";
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
        size={"90%"}
      >
        <span>
          <small>
            <small>
              ⚠ Solo podemos ofrecerte busquedas de películas con fecha de
              estreno hasta mediados del 2022
            </small>
          </small>
        </span>
        <SimpleGrid cols={5} spacing="xl" style={{ marginTop: "20px" }}>
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
