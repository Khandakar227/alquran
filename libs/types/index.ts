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
    loop: 0 | 1 | 2;
    setLoop: Dispatch<SetStateAction<0 | 1 | 2>>;
    intervalRef: MutableRefObject<any>;
    isReady: MutableRefObject<boolean>;
  }