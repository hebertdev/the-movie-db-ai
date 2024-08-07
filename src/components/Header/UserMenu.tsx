"use client";

import cx from "clsx";
import {
  Avatar,
  Group,
  Menu,
  rem,
  Text,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import {
  IconChevronDown,
  IconHeart,
  IconLogout,
  IconSettings,
  IconStar,
} from "@tabler/icons-react";
import { useState } from "react";

import classes from "./UserMenu.module.css";
import { useUserContext } from "hooks/useUserContext";
import { urlImageProfile } from "helpers/images";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";

export function UserMenu() {
  const { user, logout } = useUserContext();
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: "pop-top-right" }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        {mobile ? (
          <Avatar
            src={urlImageProfile(user?.avatar?.tmdb?.avatar_path!)}
            alt={user?.username}
            radius="xl"
            size={"sm"}
          />
        ) : (
          <UnstyledButton
            className={cx(classes.user, {
              [classes.userActive]: userMenuOpened,
            })}
          >
            <Group gap={7}>
              <Avatar
                src={urlImageProfile(user?.avatar?.tmdb?.avatar_path!)}
                alt={user?.username}
                radius="xl"
                size={20}
              />
              <Text fw={500} size="sm" lh={1} mr={3}>
                {user?.username}
              </Text>
              <IconChevronDown
                style={{ width: rem(12), height: rem(12) }}
                stroke={1.5}
              />
            </Group>
          </UnstyledButton>
        )}
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={
            <IconHeart
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.red[6]}
              stroke={1.5}
            />
          }
          component={Link}
          href={`/favorites`}
        >
          Liked movies
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          color="red"
          onClick={logout}
          leftSection={
            <IconLogout
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
        >
          Cerrar sesión
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
