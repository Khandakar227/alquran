//Most of the work done from https://letsbuildui.dev/articles/building-an-audio-player-with-react-hooks
import { useAudio } from "@/libs/context/audio";
import { generateNumber } from "@/libs/index";
import { AudioContextProps } from "@/libs/types";
import { Box, Button } from "@mantine/core";
import {
  LoopIcon,
  PauseIcon,
  PlayIcon,
  TrackNextIcon,
  TrackPreviousIcon,
} from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";

export default function AudioPlayer({
  ayah_numbers,
}: {
  ayah_numbers: number[];
}) {
  const urls = useRef<string[]>([]);
  const {trackIndex, setTrackIndex, isPlaying, setIsPlaying, loop, setLoop} = useAudio() as AudioContextProps;
  
  const [trackProgress, setTrackProgress] = useState(0);
  const audioRef = useRef({} as HTMLAudioElement);
  const intervalRef = useRef<any>();
  const isReady = useRef(false);

  const { duration } = audioRef.current;

  //Set audio URLS
  useEffect(() => {
    urls.current = ayah_numbers[0]
      ? generateNumber(ayah_numbers[0], ayah_numbers[1]).map(
          (ayah_num) =>
            `https://cdn2.islamic.network/quran/audio/128/ar.alafasy/${ayah_num}.mp3`
        )
      : [];
     audioRef.current = new Audio(urls.current[trackIndex])

    console.log("Inside useEffect 1, setUrls", urls);
  }, [ayah_numbers]);
  /**
   * Go to previous tag
   */
  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(0);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };
  /**
   * Go to next track
   */
  const toNextTrack = () => {
    if (trackIndex < urls.current.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };

  //Whenever isPlaying state changes, Call the play() or pause()
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().then(() => startTimer()); //Start tracking progress
    } else {
      cancelAnimationFrame(intervalRef.current);
      audioRef.current.pause();
    }
  }, [isPlaying, loop]);

  // cleanup
  useEffect(() => {
    return () => {
      audioRef.current.pause();
      cancelAnimationFrame(intervalRef.current);
    };
  }, []);

  // Handle setup when changing tracks
  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(urls.current[trackIndex]);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        startTimer();
      });
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [trackIndex]);

  const startTimer = () => {
    // Clear any timers already running
    cancelAnimationFrame(intervalRef.current);
    if (audioRef.current.ended) {
      if (loop === 1) {
        //Loop all the audio
        toNextTrack();
      } else if (loop === 2) {
        //Repeat single audio
        audioRef.current.pause();
        audioRef.current.play().then(() => {
          setTrackProgress(audioRef.current.currentTime);
          setIsPlaying(true);
        });
      } else {
        //No repeat audio
        setIsPlaying(false);
      }
    } else {
      setTrackProgress(audioRef.current.currentTime);
    }
    intervalRef.current = requestAnimationFrame(startTimer);
  };

  const onScrub = (value: string) => {
    // Clear any timers already running
    cancelAnimationFrame(intervalRef.current);

    audioRef.current.currentTime = isNaN(+value) ? 0 : +value;

    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not playing, start
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  const displayDuration = (time: number) => {
    function padZero(v: number) {
      return v < 10 ? "0" + v : v;
    }
    const sec = Math.round(time % 60);
    const min = Math.round((time / 60) % 60);
    const hr = Math.round((time / (60 * 60)) % 24);
    return (
      padZero(time ? hr : 0) +
      ":" +
      padZero(time ? min : 0) +
      ":" +
      padZero(time ? sec : 0)
    );
  };
  return (
    <Box sx={{ padding: "5rem 0" }}>
      {urls.current && (
        <Box
          sx={(theme) => ({
            position: "fixed",
            bottom: "0",
            left: "0",
            width: "100%",
            background: theme.colorScheme === 'dark' ? theme.black : theme.white,
            padding: "5px 0",
            boxShadow: '0 1px 3px rgb(0 0 0), rgb(0 0 0) 0px 20px 25px 0px, rgb(0 0 0) 0px 10px 10px -5px',
          })}
        >
          <Box
            component="input"
            sx={{ width: "100%", height: "5px" }}
            type="range"
            value={isNaN(trackProgress) ? 1 : trackProgress}
            step={0.5}
            min={0}
            max={duration ? duration - 1 : 0}
            onChange={(e: { target: { value: string } }) =>
              onScrub(e.target.value)
            }
            onMouseUp={onScrubEnd}
            onKeyUp={onScrubEnd}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <small>{displayDuration(audioRef.current.currentTime)}</small>
            <small>{trackIndex + 1}</small>
            <small>{displayDuration(duration)}</small>
          </Box>
          <AudioControls
            isPlaying={isPlaying}
            isLoop={loop}
            onPrevClick={toPrevTrack}
            onNextClick={toNextTrack}
            onPlayPauseClick={setIsPlaying}
            onLoopClick={setLoop}
          />
        </Box>
      )}
    </Box>
  );
}

function AudioControls({
  isPlaying,
  isLoop,
  onPlayPauseClick,
  onPrevClick,
  onNextClick,
  onLoopClick,
}: {
  isPlaying: boolean;
  isLoop: 0 | 1 | 2;
  onPlayPauseClick: Function;
  onPrevClick: any;
  onNextClick: any;
  onLoopClick: Function;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: ".3rem",
      }}
    >
      <Button
        title={isLoop === 0 ? "No loop" : isLoop === 2 ? "Loop once" : "Loop"}
        variant="filled"
        color={isLoop === 1 ? "green" : isLoop === 2 ? "blue" : "red"}
        radius="md"
        size="md"
        sx={{ display: "flex", alignItems: "center" }}
        compact
        aria-label="Loop"
        onClick={() => onLoopClick(isLoop === 0 ? 1 : isLoop === 1 ? 2 : 0)}
      >
        <LoopIcon />
        <small>{isLoop === 0 ? "X" : isLoop === 2 ? "1" : ""}</small>
      </Button>
      <Button
        title="Previous ayah"
        color="red"
        radius="md"
        size="md"
        compact
        aria-label="Previous"
        onClick={onPrevClick}
      >
        <TrackPreviousIcon />
      </Button>

      {isPlaying ? (
        <Button
          title="Pause"
          color="red"
          radius="md"
          size="md"
          compact
          onClick={() => onPlayPauseClick(false)}
          aria-label="Pause"
        >
          <PauseIcon />
        </Button>
      ) : (
        <Button
          title="Play"
          color="red"
          radius="md"
          size="md"
          compact
          onClick={() => onPlayPauseClick(true)}
          aria-label="Play"
        >
          <PlayIcon />
        </Button>
      )}
      <Button
        title="Next"
        color="red"
        radius="md"
        size="md"
        compact
        aria-label="Next"
        onClick={onNextClick}
      >
        <TrackNextIcon />
      </Button>
    </Box>
  );
}
