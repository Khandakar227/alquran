import useSWR, { Key } from "swr";
import { useState, useEffect } from "react";
import { LastRead, Surah, Ayah } from "./types";
import { useLocalStorageValue } from "@mantine/hooks";

class SWRError extends Error {
  info: any | undefined;
  status: number | undefined;
}
export const fetcher = async (url: RequestInfo) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new SWRError("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export function useSWRPrime(url: Key) {
  const { data, error } = useSWR(url, fetcher,{
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}


export const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return isMounted;
};

export const checkLastRead = () => {
  const [lastRead, setLastRead] = useLocalStorageValue({ key: "last-read" });
  try {
    if (lastRead)
      return { lastRead: JSON.parse(lastRead) as LastRead, setLastRead };
  } catch (error) {
    console.log(error);
    return { lastRead: null, setLastRead };
  }
  return { lastRead: null, setLastRead };
};

export function generateMetadata (ayahs:Ayah[], surahDetail:Surah) {
  let data = [];
  for (let i = 0; i < ayahs.length; i++) {
    data.push({
            url:`https://cdn2.islamic.network/quran/audio/128/ar.alafasy/${ayahs[i].ayah_number}.mp3`,
            metadata: {
              title: `${surahDetail.number}. ${surahDetail.englishName}, Ayat no. ${ayahs[i].ayah_number_in_surah}`,
              artwork: [{src: "/Quran_Kareem.png", type: "image/png"}]
            }
            });
  }
  return data;
}