import { useTranslation } from "@/libs/context";
import { Menu, Box, Button } from "@mantine/core";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Translation } from "@/libs/types";
import { checkLastRead } from "@/libs/index";
import { useRouter } from "next/router";

export default function Settings() {
  const router = useRouter();
  const [translation, setTranslation] = useTranslation();
  const { lastRead } = checkLastRead();

  function translateTo(tr: Translation) {
    typeof setTranslation === "function" && setTranslation(tr);
  }

  function goToLastRead() {
    if (lastRead)
      router.push(
        `/${lastRead?.surah_number}?ayah=${lastRead?.from}:${lastRead?.to}`
      );
  }

  return (
    <Box sx={{ position: "relative", textAlign: "center" }}>
      <Menu
        control={
          <Button size="md" compact>
            <HamburgerMenuIcon />
          </Button>
        }
      >
        <Menu.Label> Translation </Menu.Label>
        <Menu.Item onClick={() => translateTo("bn")}> Bangla </Menu.Item>
        <Menu.Item onClick={() => translateTo("en")}> English </Menu.Item>
        <Menu.Label> Last read </Menu.Label>
        <Menu.Item onClick={goToLastRead}>
          {lastRead
            ? `Surah no: ${lastRead.surah_number} ${
                lastRead.from || lastRead.to
                  ? `, ayah ${lastRead.from}-${lastRead.to}`
                  : ""
              }`
            : "No last read surah"}
        </Menu.Item>
      </Menu>
    </Box>
  );
}
