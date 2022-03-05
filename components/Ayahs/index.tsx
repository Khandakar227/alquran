import { Box, Button, Paper } from "@mantine/core";
import Link from "next/link";
import { Ayah, Surah } from "@/libs/types/index";
import ArabicWBW from "@/components/ArabicWBW";
import {useAudio} from "@/libs/context/audio";
import AudioPlayer from "../AudioPlayer";
import {PauseIcon, PlayIcon} from "@radix-ui/react-icons";
import {generateNumber} from "@/libs/index"
import {useState, useEffect} from "react";

function Ayahs({ data, surahDetail }: { data: Ayah[]; surahDetail: Surah }) {
 const [urls, setUrls] = useState<string[] | any[]>([]);
 
 const {isPlaying, setIsPlaying, trackIndex, setTrackIndex} = useAudio() as AudioContextProps;
 
 useEffect(() =>{
setUrls(data[0]
      ? generateNumber(data[0].ayah_number, data[data.length - 1].ayah_number || 1).map(
          (ayah_num) =>
            `https://cdn2.islamic.network/quran/audio/128/ar.alafasy/${ayah_num}.mp3`
        ) : []);
 },[])
  
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
  
  function play (i: number) {
    if (trackIndex !== i) setTrackIndex(i)
    else setIsPlaying(true)
  }
  return (
    <>
      {data &&
        data?.map((ayah, i) => (
          <Paper mb="sm" shadow="xs" padding="sm" key={ayah.ayah_number}>
            <span>{ayah.ayah_number_in_surah}. </span>
            <ArabicWBW ayah={ayah.ayah_wbw} />
            <Box sx={{ fontSize: "1.1rem" }}>
              {ayah.ayahEN ? ayah.ayahEN : ayah.ayahBN}
            </Box>
            {
              isPlaying && trackIndex === i ?
              <Button compact variant="outline" color='red' onClick={() => setIsPlaying(false)}>
                <PauseIcon />
              </Button>
              :
              <Button compact variant="outline" onClick={() => play(i)}>
                <PlayIcon/>
              </Button>
            }
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
          <AudioPlayer urls={urls}>
          <Box components='small' sx={{textAlign:'center', fontSize:'10px'}}> Recited by Mishari bin Rashed Alafasy </Box>
          </AudioPlayer>
        </Box>
      )}
    </>
  );
}

export default Ayahs;


