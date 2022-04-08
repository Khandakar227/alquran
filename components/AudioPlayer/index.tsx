import { useAudio } from "@/libs/context/audio";
import { AudioContextProps } from "@/libs/types";
import { Box, Button } from "@mantine/core";
import {
  LoopIcon,
  PauseIcon,
  PlayIcon,
  TrackNextIcon,
  TrackPreviousIcon,
} from "@radix-ui/react-icons";
import { useEffect, useRef, useState, ReactNode } from "react";

export default function AudioPlayer({
  src=[],
  children,
}: {
  src: {metadata?: MediaMetadataInit, url: string}[]| any[];
  children?:ReactNode;
}) {
  const {trackIndex, setTrackIndex, isPlaying, setIsPlaying, loop, setLoop} = useAudio() as AudioContextProps;
  
  const [trackProgress, setTrackProgress] = useState(0);
  const audioRef = useRef({} as HTMLAudioElement);

  const [duration, setDuration] = useState(0);

  function timeUpdate () {
    setTrackProgress(audioRef.current.currentTime ?? 0)
  }
  function loadedMetadata () {
    if (!audioRef.current.tagName) return;
    setDuration(audioRef.current.duration);
  }
  function ended () {
    switch(loop) {
    case 'repeat-all':
      toNextTrack();
      break;
    case 'repeat':
      audioRef.current.play();
      break;
    default:
      setIsPlaying(false);
     }
  }
  /**
   * Go to previous tag
   */
  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) setTrackIndex(0);
    else setTrackIndex(trackIndex - 1);
  };
  /**
   * Go to next track
   */
  const toNextTrack = () => {
    if (trackIndex < src.length - 1) setTrackIndex(trackIndex + 1);
    else  setTrackIndex(0);
  };
  
  useEffect(() =>{
    if (!audioRef.current.tagName) return;
    
    if(isPlaying) {
      audioRef.current.play().then(() =>{
        showMediaSession(src[trackIndex].metadata, src.length)
      })
    } else audioRef.current.pause()
  },[isPlaying, trackIndex])
  
  // cleanup
  useEffect(() => {
    if (!audioRef.current.tagName) return
    return () => {
      audioRef.current.pause();
    };
  }, []);
  
  useEffect(() =>{
    setTrackIndex(0)
  },[src])
  const onScrub = (value: string) => {
    audioRef.current.currentTime = isNaN(+value) ? 0 : +value;
    setTrackProgress(audioRef.current.currentTime);
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
 const showMediaSession = (metadata:MediaMetadataInit, numOfTracks: number) => {
  if (!('mediaSession' in navigator)) return
  
  navigator.mediaSession.metadata = new MediaMetadata(metadata);
  
  navigator.mediaSession.setActionHandler('play', function() {
    setIsPlaying(true);
    navigator.mediaSession.playbackState = "playing";
  });
  
  navigator.mediaSession.setActionHandler('pause', function() {
    setIsPlaying(false);
    navigator.mediaSession.playbackState  = "paused";
  });
  navigator.mediaSession.setActionHandler('stop', function() {
    setIsPlaying(false);
  })
  navigator.mediaSession.setActionHandler('previoustrack', toPrevTrack);
  navigator.mediaSession.setActionHandler('nexttrack', toNextTrack)
}
  return (
    <Box sx={{ padding: "5.2rem 0" }}>
      {
      src.length && (
        <Box
          sx={(theme) => ({
            position: "fixed",
            bottom: "0",
            left: "0",
            width: "100%",
            background: theme.colorScheme === 'dark' ? theme.black : theme.white,
            padding: "2px 0 4px",
            boxShadow: '0 1px 3px rgb(0 0 0), rgb(0 0 0) 0px 20px 25px 0px, rgb(0 0 0) 0px 10px 10px -5px',
          })}
        >
          <audio 
          src={src[trackIndex].url}
          ref={audioRef}
          onTimeUpdate={() => timeUpdate()}
          onLoadedMetadata={()=>loadedMetadata()}
          onEnded={()=>ended()}
          ></audio>
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
          {children}
        </Box>
      )
      }
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
  isLoop: "repeat" | "no-repeat" | "repeat-all";
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
        title={isLoop === "no-repeat" ? "No loop" : isLoop === "repeat" ? "Loop once" : "Loop"}
        variant="filled"
        color={isLoop === "repeat-all" ? "green" : isLoop === "repeat" ? "blue" : "red"}
        radius="md"
        size="md"
        sx={{ display: "flex", alignItems: "center" }}
        compact
        aria-label="Loop"
        onClick={() => onLoopClick(
            isLoop === "no-repeat" ?
            "repeat" : isLoop === "repeat" ?
            "repeat-all" : "no-repeat"
            )}
      >
        <LoopIcon />
        <small>{isLoop === "no-repeat" ? "X" : isLoop === "repeat" ? "1" : ""}</small>
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
