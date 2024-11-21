"use client";

import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

interface DescriptionProps {
  overview: string;
}

export function Description({ overview }: DescriptionProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <span onClick={open} style={{ cursor: "pointer" }}>
        <b>ver más</b>
      </span>
      <Modal centered opened={opened} onClose={close} title="Vista general">
        {overview}
      </Modal>
    </>
  );
}
