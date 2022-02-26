import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

export default function ThemeMode() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <>
      <ActionIcon
        variant="outline"
        color={dark ? "yellow" : "red"}
        onClick={() => toggleColorScheme()}
        title="Toggle color scheme"
      >
        {dark ? (
          <SunIcon style={{ width: 18, height: 18 }} />
        ) : (
          <MoonIcon style={{ width: 18, height: 18 }} />
        )}
      </ActionIcon>
    </>
  );
}
