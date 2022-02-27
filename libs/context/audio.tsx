import {
  createContext,
  ReactChild,
  useContext,
  useRef,
  useState,
} from "react";
import { AudioContextProps } from "../types";

const audioContext = createContext<AudioContextProps | {}>({});

export const useAudioProvider = () => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loop, setLoop] = useState<0 | 1 | 2>(0);
  const intervalRef = useRef<any>();
  const isReady = useRef(false);

  return ({
    trackIndex,
    setTrackIndex,
    isPlaying,
    setIsPlaying,
    loop,
    setLoop,
    intervalRef,
    isReady,
  });
};

export const useAudio = () => {
    return useContext(audioContext)
}

export default function AudioProvider({children}:{children?: ReactChild | ReactChild[]}) {
    const audio = useAudioProvider();
    return (
        <audioContext.Provider value={audio}>
            {children}
        </audioContext.Provider>
    )
}