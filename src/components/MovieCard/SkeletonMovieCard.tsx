//mantineui
import { Card, Text, Rating, Center, Skeleton } from "@mantine/core";

export function SkeletonMovieCard() {
  return (
    <Card shadow="sm" padding="md">
      <Card.Section>
        <Skeleton height={350} />
      </Card.Section>
      <Center>
        <Rating count={10} defaultValue={0} value={0} mt={"1rem"} />
      </Center>
      <Skeleton height={10} mt="md" />
      <Center>
        <Skeleton height={10} mt="2px" width={"50%"} />
      </Center>

      <Center>
        <Skeleton height={10} mt="md" mb="xs" width={20} />
        <Skeleton height={10} mt="md" mb="xs" width={20} />
        <Skeleton height={10} mt="md" mb="xs" width={20} />
      </Center>
    </Card>
  );
}
