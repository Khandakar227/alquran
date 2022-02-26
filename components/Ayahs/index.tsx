import { Box, Button, Paper } from "@mantine/core";
import Link from "next/link";
import { Ayah, Surah } from "@/libs/types/index";
import ArabicWBW from "@/components/ArabicWBW";
import AudioPlayer from "../AudioPlayer";

function Ayahs({ data, surahDetail }: { data: Ayah[]; surahDetail: Surah }) {
  console.log(surahDetail.number);

  function readMore() {
    const from = data[data.length - 1].ayah_number_in_surah;
    const to =
      from + 10 <= surahDetail.numberOfAyahs
        ? from + 10
        : surahDetail.numberOfAyahs;

    return `/${surahDetail.number}?ayah=${from}:${to}`;
  }

  function readPrevious() {
    const to = data[0].ayah_number_in_surah;
    const from = to - 10 >= 1 ? to - 10 : 1;

    return `/${surahDetail.number}?ayah=${from}:${to}`;
  }

  function previousSurah() {
    return `/${surahDetail.number > 1 && surahDetail.number - 1}`;
  }
  function nextSurah() {
    return `/${surahDetail.number < 114 && surahDetail.number + 1}`;
  }
  return (
    <>
      {data &&
        data?.map((ayah) => (
          <Paper mb="sm" shadow="xs" padding="sm" key={ayah.ayah_number}>
            <span>{ayah.ayah_number_in_surah}. </span>
            <ArabicWBW ayah={ayah.ayah_wbw} />
            <Box sx={{ fontSize: "1.1rem" }}>
              {ayah.ayahEN ? ayah.ayahEN : ayah.ayahBN}
            </Box>
          </Paper>
        ))}
      {data && (
        <Box sx={{ display: "flex", gap: "5px" }}>
          {surahDetail.number > 1 && data[0].ayah_number_in_surah <= 1 && (
            <Link href={previousSurah()}>
              <Button my="lg" size="lg" color="blue" fullWidth>
                Read previous surah
              </Button>
            </Link>
          )}

          {surahDetail.number < 114 &&
            data[data?.length - 1].ayah_number_in_surah >=
              surahDetail.numberOfAyahs && (
              <Link href={nextSurah()}>
                <Button my="lg" size="lg" color="red" fullWidth>
                  Read next surah
                </Button>
              </Link>
            )}

          {data[0].ayah_number_in_surah > 1 && (
            <Link href={readPrevious()}>
              <Button my="lg" size="lg" color="cyan" fullWidth>
                Previous
              </Button>
            </Link>
          )}

          {surahDetail.numberOfAyahs >
            data[data?.length - 1].ayah_number_in_surah && (
            <Link href={readMore()}>
              <Button my="lg" size="lg" color="indigo" fullWidth>
                Next
              </Button>
            </Link>
          )}
          <AudioPlayer ayah_numbers={[data[0].ayah_number || 1, data[data.length - 1].ayah_number || 1]} />
        </Box>
      )}
    </>
  );
}

export default Ayahs;
