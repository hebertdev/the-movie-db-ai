import cx from "clsx";
import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconBrightnessDown, IconMoon, IconSun } from "@tabler/icons-react";
import classes from "./DarkModeButton.module.css";

export function DarkModeButton() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <>
      <ActionIcon
        variant="transparent"
        aria-label="Toggle color scheme"
        onClick={() =>
          setColorScheme(computedColorScheme === "light" ? "dark" : "light")
        }
        size={"lg"}
        radius={"md"}
      >
        <IconSun className={cx(classes.icon, classes.light)} />
        <IconMoon className={cx(classes.icon, classes.dark)} />
      </ActionIcon>
    </>
  );
}
