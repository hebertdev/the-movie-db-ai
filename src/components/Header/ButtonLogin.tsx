"use client";

import { useState } from "react";

//helpers
import { setToken } from "helpers/auth";

//mantineui
import { notifications } from "@mantine/notifications";

import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Paper,
  Group,
  PaperProps,
  Button,
  Anchor,
  Stack,
  Modal,
} from "@mantine/core";
import {
  newSessionAuthenticationData,
  newTokenAuthentication,
  validateTokenAuthenticationData,
} from "services/themoviedb";

export function ButtonLogin() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Button onClick={open}>Iniciar sesión</Button>
      <Modal
        opened={opened}
        onClose={close}
        title="Autenticación con cuenta de TheMovieDB"
      >
        <AuthenticationForm />
      </Modal>
    </>
  );
}

export function AuthenticationForm(props: PaperProps) {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  return (
    <Paper radius="md" pb={"xl"} pt={"md"} {...props}>
      <form
        onSubmit={form.onSubmit(async () => {
          if (loading) return;
          if (form.errors.username || form.errors.password) return;
          setLoading(true);
          try {
            const newToken = await newTokenAuthentication();
            const validateToken = await validateTokenAuthenticationData({
              username: form.values.username,
              password: form.values.password,
              request_token: newToken.request_token,
            });

            const newSession = await newSessionAuthenticationData(
              validateToken.request_token
            );
            setLoading(false);
            setToken(newSession.session_id);
            document.location.reload();
          } catch (error) {
            notifications.show({
              title: "Error",
              message: `Ocurrió un error al Iniciar sesión`,
              color: "red",
            });
            setLoading(false);
          }
        })}
      >
        <Stack>
          <TextInput
            required
            label="Nombre de usuario"
            placeholder="hebertdev"
            value={form.values.username}
            onChange={(event) =>
              form.setFieldValue("username", event.currentTarget.value)
            }
            error={form.errors.username && "Invalid email"}
            radius="md"
          />

          <PasswordInput
            required
            label="Contraseña"
            placeholder="Tu contraseña"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 6 characters"
            }
            radius="md"
          />
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor
            component="a"
            type="button"
            c="dimmed"
            size="xs"
            href="https://www.themoviedb.org/signup?language=es"
            target="_blank"
          >
            No tienes una cuenta? Regístrate
          </Anchor>
          <Button type="submit" radius="xl" loading={loading}>
            Iniciar sesión
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
