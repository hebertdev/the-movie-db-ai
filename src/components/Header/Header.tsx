"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

//contexts
import { useUserContext } from "hooks/useUserContext";

//mantineui
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

import {
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  useMantineTheme,
  Container,
  Text,
} from "@mantine/core";

import { IconSparkles } from "@tabler/icons-react";

//styles
import classes from "./Header.module.css";

//assets
import { ButtonLogin, DarkModeButton, UserMenu } from ".";
import { ColorSchemeToggle } from "components/ColorSchemeToggle/ColorSchemeToggle";
import { notifications } from "@mantine/notifications";

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [scrolling, setScrolling] = useState(false);

  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { handleGetUser, user } = useUserContext();

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <Box>
      <header
        className={`${classes.header} ${
          scrolling ? classes.header_with_scrolling : ""
        }`}
      >
        <Container className={classes.header_container} size={"xl"}>
          <Group justify="space-between" h="100%">
            <Box className={classes.logo} component={Link} href={"/"} />
            <Group h="100%" gap={0} visibleFrom="sm"></Group>
            <Group visibleFrom="sm">
              <DarkModeButton />

              {user ? (
                <Button
                  variant="light"
                  leftSection={<IconSparkles />}
                  component={Link}
                  href={"/foryou"}
                >
                  Para tí
                </Button>
              ) : (
                <Button
                  variant="light"
                  leftSection={<IconSparkles />}
                  onClick={() => {
                    notifications.show({
                      title: "Error",
                      message: `Inicia sesión para ver recomendaciones personalizadas.`,
                      color: "red",
                      position: "top-center",
                    });
                  }}
                >
                  Para tí
                </Button>
              )}

              {user ? <UserMenu /> : <ButtonLogin />}
              <Burger opened={drawerOpened} onClick={toggleDrawer} />
            </Group>

            <Group hiddenFrom="sm">
              {user ? <UserMenu /> : <ButtonLogin />}
              <Burger
                opened={drawerOpened}
                onClick={toggleDrawer}
                hiddenFrom="sm"
              />
            </Group>
          </Group>
        </Container>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size={mobile ? "100%" : "sm"}
        padding="md"
        title="Menu"
        zIndex={1000000}
        position="right"
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <Link href="/" className={classes.link} onClick={toggleDrawer}>
            Home
          </Link>

          {user && (
            <Link
              href="/foryou"
              className={classes.link}
              onClick={toggleDrawer}
            >
              Para tí
            </Link>
          )}

          {user && (
            <Link
              href="/favorites"
              className={classes.link}
              onClick={toggleDrawer}
            >
              Favoritos
            </Link>
          )}

          <Divider my="sm" />
          <ColorSchemeToggle />
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
