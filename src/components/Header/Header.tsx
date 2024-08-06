"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

//contexts
import { useUserContext } from "hooks/useUserContext";

//helpers
import { getToken } from "helpers/auth";

//mantineui
import { useDisclosure } from "@mantine/hooks";

import {
  Group,
  Button,
  UnstyledButton,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  useMantineTheme,
  Container,
  Text,
} from "@mantine/core";

import { IconChevronDown, IconSparkles } from "@tabler/icons-react";

//styles
import classes from "./Header.module.css";

//assets
import { ButtonLogin, DarkModeButton, UserMenu } from ".";
import { ColorSchemeToggle } from "components/ColorSchemeToggle/ColorSchemeToggle";

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();
  const [scrolling, setScrolling] = useState(false);

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
              <Button variant="light" leftSection={<IconSparkles />}>
                Para tí
              </Button>

              {user ? <UserMenu /> : <ButtonLogin />}
            </Group>
            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom="sm"
            />
          </Group>
        </Container>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Menu"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <Link href="/" className={classes.link} onClick={toggleDrawer}>
            Home
          </Link>

          <Link
            href="/portfolio"
            className={classes.link}
            onClick={toggleDrawer}
          >
            Portafolio
          </Link>
          <Link href="/blog" className={classes.link} onClick={toggleDrawer}>
            Blog
          </Link>

          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Apps
              </Box>
              <IconChevronDown
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.blue[6]}
              />
            </Center>
          </UnstyledButton>

          <Divider my="sm" />
          <ColorSchemeToggle />
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
