import { useTranslation } from "@/libs/context";
import { Menu, Box, Button } from "@mantine/core";
import { GearIcon } from "@radix-ui/react-icons";
import {Translation} from "@/libs/types";

export default function Settings() {
  const [translation, setTranslation] = useTranslation();
  
  function translateTo (tr: Translation) {
    typeof(setTranslation) === 'function' && setTranslation(tr);
  }
  return (
    <Box sx={{ position: "relative", textAlign: 'center' }}>
      <Menu
        control={
          <Button size="md" compact>
            <GearIcon/>
          </Button>
        }
      >
          <Menu.Label> Translation </Menu.Label>
          <Menu.Item onClick={() => translateTo('bn')}> Bangla </Menu.Item>
          <Menu.Item onClick={() => translateTo('en')}> English </Menu.Item>
      </Menu>
    </Box>
  );
}
