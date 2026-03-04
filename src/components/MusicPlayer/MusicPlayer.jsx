import { useRef, useEffect, useState } from "react";
import styles from "./MusicPlayer.module.css";

const BASE_URL = "https://archive.org/download/DWK312/";

const TRACKS = [
  { file: "Centz_-_01_-_Bonjour.mp3", title: "Bonjour" },
  { file: "Centz_-_07_-_Samurai_Disco.mp3", title: "Samurai Disco" },
  { file: "Centz_-_08_-_B-Boy_Stance.mp3", title: "B-Boy Stance" },
  { file: "Centz_-_06_-_1990.mp3", title: "1990" },
  { file: "Centz_-_10_-_Memory_Box.mp3", title: "Memory Box" },
  { file: "Centz_-_14_-_Neon_Noir.mp3", title: "Neon Noir" },
  { file: "Centz_-_03_-_The_London_Underground.mp3", title: "The London Underground" },
  { file: "Centz_-_12_-_Poison_Darts.mp3", title: "Poison Darts" },
];

function MusicPlayer({ isPlaying }) {
  const audioRef = useRef(null);
  const trackIndex = useRef(0);
  const [currentTrack, setCurrentTrack] = useState(TRACKS[0]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      const next = TRACKS[trackIndex.current % TRACKS.length];
      setCurrentTrack(next);
      audio.src = BASE_URL + next.file;
      audio.play().catch(() => {});
      trackIndex.current++;
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  return (
    <div className={`${styles.container} ${isPlaying ? styles.visible : ""}`}>
      <audio ref={audioRef} loop preload="none" />
      <div className={styles.content}>
        <div className={styles.equalizer}>
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </div>
        <span className={styles.track}>{currentTrack.title} — Centz</span>
      </div>
    </div>
  );
}

export default MusicPlayer;
