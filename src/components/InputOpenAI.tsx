"use client";

import { useEffect, useState } from "react";

//services
import { verifyToken } from "services/openai";

//helpers
import {
  setTokenOpenai,
  deleteTokenOpenai,
  getTokenOpenai,
} from "helpers/openai";

import { Box, TextInput, Button } from "@mantine/core";
import { IconSend } from "@tabler/icons-react";

//mantineui
import { notifications } from "@mantine/notifications";

//styles
import classes from "./InputOpenAI.module.css";

export function InputOpenAI() {
  const [isVisible, setIsVisible] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsVisible(!getTokenOpenai());
  }, []);

  const handleVerifyToken = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const data = await verifyToken(apiKey);
      console.log(data);
      if (data?.status === 401) {
        notifications.show({
          title: "Error",
          message: `API Key de OpenAI es inválida`,
          color: "red",
        });
        deleteTokenOpenai();
        setLoading(false);

        return;
      }
      if (data?.status === 200) {
        setTokenOpenai(apiKey);
        notifications.show({
          title: "Éxito",
          message: `API Key de OpenAI verificada con éxito`,
          color: "green",
        });
        document.location.reload();
      }

      setLoading(false);
    } catch (error) {
      notifications.show({
        title: "Error",
        message: `API Key de OpenAI es inválida`,
        color: "red",
      });
      deleteTokenOpenai();
      setLoading(false);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div className="container_api_key">
        <Box
          className={classes.container_form}
          component="form"
          onSubmit={handleVerifyToken}
        >
          <TextInput
            description="Ingresa tu API Key de OpenAI"
            placeholder="API Key"
            type="password"
            value={apiKey}
            onChange={(event) => setApiKey(event.currentTarget.value)}
          />
          <Button
            leftSection={<IconSend />}
            fullWidth
            mt={"xs"}
            onClick={handleVerifyToken}
            loading={loading}
          >
            Enviar
          </Button>
        </Box>
      </div>
    </>
  );
}
