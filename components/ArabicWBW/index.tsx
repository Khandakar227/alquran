import { useState, useEffect } from "react";
import { Box } from "@mantine/core";
import styles from "./style.module.css";

function ArabicWBW({ ayah }: { ayah: string }) {
  const [arabicText, setArabicText] = useState<any>();

  
  useEffect(() => {
    if (ayah) {
      try {
        setArabicText(JSON.parse(ayah));
      } catch (error: any) {
        console.log(error.message);
      }
    }
  }, []);

  return (
    <Box
      sx={{ margin: "10px 0", fontWeight: "bold", fontSize: "clamp(1.2rem, 6vw, 2rem)" }}
      lang="ar"
    >
      {arabicText &&
        arabicText.map((word: any) => (
          <span key={word.word_number_in_quran} className={styles.arabicWord}>

            <Box
              component="span"
              className={styles.translation}
              sx={(theme) => ({
                fontSize: "13px",
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[5]
                    : theme.colors.dark[6],
                color: "white",
              })}
            >
              {word.word_translation}
            </Box>

            {word.word_arabic_uthmani}{" "}

            <Box
            component="span"
            className={styles.transliteration}
            sx={(theme) => ({
              fontSize: "13px",
              backgroundColor: theme.colors.yellow[6],
              color: "black",
            })}>
              {word.word_transliteration}<br/>
              root: {word.word_root}
            </Box>
          </span>
        ))}
    </Box>
  );
}

export default ArabicWBW;
