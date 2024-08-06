"use client";
import {
  SegmentedControl,
  useMantineColorScheme,
  Center,
  rem,
} from "@mantine/core";
import { IconSun, IconMoon, IconDeviceLaptop } from "@tabler/icons-react";

export function ColorSchemeToggle() {
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  return (
    <>
      <SegmentedControl
        value={colorScheme}
        onChange={(value: any) => setColorScheme(value)}
        data={[
          {
            value: "light",
            label: (
              <Center style={{ gap: 10 }}>
                <IconSun style={{ width: rem(16), height: rem(16) }} />
                <span>Light</span>
              </Center>
            ),
          },
          {
            value: "auto",
            label: (
              <Center style={{ gap: 10 }}>
                <IconDeviceLaptop style={{ width: rem(16), height: rem(16) }} />
                <span>System</span>
              </Center>
            ),
          },
          {
            value: "dark",
            label: (
              <Center style={{ gap: 10 }}>
                <IconMoon style={{ width: rem(16), height: rem(16) }} />
                <span>Dark</span>
              </Center>
            ),
          },
        ]}
        size="md"
        m={10}
        fullWidth
      />
    </>
  );
}
