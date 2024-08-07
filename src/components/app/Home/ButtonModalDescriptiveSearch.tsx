"use client";

import { Fragment, useEffect } from "react";

//mantineui
import { Modal, Button, Box, ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

//styles
import classes from "./ButtonModalDescriptiveSearch.module.css";
import { IconSend } from "@tabler/icons-react";
import { MessageLeft, MessageRight } from "./Message";

type Message = {
  role: string;
  content: string;
};
interface ButtonModalDescriptiveSearchProps {
  handleSubmitChat: () => void;
  handleSetDescriptiveSearchText: (value: string) => void;
  descriptiveSearchText: string;
  modifiedConversation: Message[];
  loadingDescriptiveSearch: boolean;
  handleClearConversation: () => void;
}

export function ButtonModalDescriptiveSearch({
  handleSubmitChat,
  handleSetDescriptiveSearchText,
  descriptiveSearchText,
  modifiedConversation,
  loadingDescriptiveSearch,
  handleClearConversation,
}: ButtonModalDescriptiveSearchProps) {
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (modifiedConversation.length > 0) {
      open();
    }
  }, [modifiedConversation]);

  const handleCloseModal = () => {
    handleClearConversation();
    close();
  };

  const handleSubmitFormChat = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmitChat();
  };

  return (
    <>
      <Button onClick={handleSubmitChat} loading={loadingDescriptiveSearch}>
        Empezar
      </Button>
      <Modal.Root
        opened={opened}
        onClose={handleCloseModal}
        size={"xl"}
        centered
      >
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Soy FlixBot y estoy aqui para ayudarte.</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>
            <Box className={classes.messages_container}>
              <Box className={classes.messages}>
                {modifiedConversation.map((message, index) => (
                  <Fragment key={index}>
                    {message.role === "user" ? (
                      <MessageRight message={message.content} />
                    ) : (
                      <MessageLeft message={message.content} />
                    )}
                  </Fragment>
                ))}
              </Box>
              <Box className={classes.estorbo}></Box>
              <Box className={classes.form}>
                <Box
                  className={classes.banner_form}
                  component="form"
                  onSubmit={handleSubmitFormChat}
                >
                  <input
                    type="text"
                    value={descriptiveSearchText}
                    onChange={(event) => {
                      handleSetDescriptiveSearchText(event.target.value);
                    }}
                    className={classes.input_search}
                    placeholder="Escribe algo..."
                    disabled={loadingDescriptiveSearch}
                  />
                  <ActionIcon
                    variant="subtle"
                    radius="lg"
                    aria-label="send message"
                    size={"lg"}
                    type="submit"
                    loading={loadingDescriptiveSearch}
                  >
                    <IconSend
                      style={{ width: "60%", height: "60%" }}
                      stroke={1.5}
                      type="submit"
                    />
                  </ActionIcon>
                </Box>
              </Box>
            </Box>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}
