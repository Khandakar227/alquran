import { Dispatch, SetStateAction, MutableRefObject } from "react";

export type Ayah = {
    ayah_number?: number;
    ayah_number_in_surah: number;
    surah_number?: number;
    page_number?: number;
    ayahEN?: string;
    ayahBN?: string;
    ayahAR?: string;
    [key: string]: any;
  };
  export type Surah = {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
  };
  export type Translation = "bn" | "en" | string;
  
  export interface AudioContextProps {
    trackIndex: number;
    setTrackIndex: Dispatch<SetStateAction<number>>;
    isPlaying: boolean;
    setIsPlaying: Dispatch<SetStateAction<boolean>>;
    loop:  "repeat" | "no-repeat" | "repeat-all";
    setLoop: Dispatch<SetStateAction< "repeat" | "no-repeat" | "repeat-all">>;
    intervalRef: MutableRefObject<any>;
    isReady: MutableRefObject<boolean>;
  }

  export type LastRead = {
    surah_number: number | string,
    from: number | string,
    to: number | string,
  }