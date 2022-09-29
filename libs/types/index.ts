import { Dispatch, SetStateAction, MutableRefObject } from "react";

export type Ayah = {
  number?: number;
  numberInSurah: number;
  surahNumber?: number;
  page?: number;
  en_ayahs?: {text: string};
  bn_ayahs?: {text: string};
  text: string;
  word_data?: word_data[];
  wbw?: {ayah_wbw: string};
  [key: string]: any;
};
export type word_data = {
  word_id: number;
  word_arabic: string;
  word_translation: string;
  word_transliteration: string;
  [key: string]: any;
};
export type wbw = {
  word_arabic: number,
  word_arabic_indopak: string,
  word_arabic_uthmani: string,
  word_ayah: number,
  word_number_in_quran: number,
  word_number_in_ayah: number,
  word_number_in_surah: number,
  word_root: string,
  word_surah: number,
  word_translation: string,
  word_transliteration: string,
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
  loop: "repeat" | "no-repeat" | "repeat-all";
  setLoop: Dispatch<SetStateAction<"repeat" | "no-repeat" | "repeat-all">>;
  intervalRef: MutableRefObject<any>;
  isReady: MutableRefObject<boolean>;
}

export type LastRead = {
  surah_number: number | string;
  from: number | string;
  to: number | string;
};
