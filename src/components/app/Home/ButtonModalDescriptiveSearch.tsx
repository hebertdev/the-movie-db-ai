"use client";

import { Fragment, useEffect, useState } from "react";

//mantineui
import { Modal, Button, Box, ActionIcon, useMantineTheme } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

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
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [isFinished, setIsFinished] = useState(false);

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

  useEffect(() => {
    if (modifiedConversation.length > 0) {
      let lastMessage = modifiedConversation[modifiedConversation.length - 1];
      if (lastMessage.role === "assistant") {
        let content = JSON.parse(lastMessage.content);
        if (content.success) {
          setIsFinished(true);
        }
      }
    }
  }, [modifiedConversation]);

  return (
    <>
      <Button onClick={handleSubmitChat} loading={loadingDescriptiveSearch}>
        Empezar
      </Button>
      <Modal.Root
        opened={opened}
        onClose={handleCloseModal}
        size={mobile ? "100%" : "xl"}
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
                {isFinished ? (
                  <>
                    <Box
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "10px",
                      }}
                    >
                      <Button w={"60%"} onClick={handleCloseModal}>
                        Cerrar conversación
                      </Button>
                      <Button
                        w={"40%"}
                        variant="outline"
                        onClick={() => setIsFinished(false)}
                      >
                        Continuar
                      </Button>
                    </Box>
                  </>
                ) : (
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
                )}
              </Box>
            </Box>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}
