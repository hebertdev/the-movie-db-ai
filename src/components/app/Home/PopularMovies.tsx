//mantineui
import { Container, Title } from "@mantine/core";

import { CardsCarousel } from "./Carrousel";

export function PopularMovies() {
  return (
    <Container size={"xl"}>
      <Title order={2} className="title" style={{ marginTop: "20px" }}>
        Lo más popular
      </Title>
      <CardsCarousel />
    </Container>
  );
}
