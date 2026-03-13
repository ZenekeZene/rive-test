import { useRef, useEffect, useState } from "react";
import styles from "./MusicPlayer.module.css";

const BASE_URL = "https://archive.org/download/classical-music-mix-by-various-artists/";

const TRACKS = [
  { file: "04 - Chopin - Etude in E Major, Op. 10, No. 3.mp3", title: "Etude in E Major", composer: "Chopin" },
  { file: "03 - Mascagni - Cavalleria Rusticana, Intermezzo.mp3", title: "Cavalleria Rusticana", composer: "Mascagni" },
  { file: "11 - Mozart - Clarinet Concerto in A Major, K622 Adagio.mp3", title: "Clarinet Concerto, Adagio", composer: "Mozart" },
  { file: "07 - Dvorak - String Serenade, in E Major, Op 22, Moderato.mp3", title: "String Serenade", composer: "Dvořák" },
  { file: "10 - Pachelbel - Canon in D Major.mp3", title: "Canon in D Major", composer: "Pachelbel" },
  { file: "05 - Bruch - Violin Concerto No. 1, in G Minor Op. 26, Adagio.mp3", title: "Violin Concerto, Adagio", composer: "Bruch" },
  { file: "09 - Schumann - Scenes from childhood, Op. 15.mp3", title: "Scenes from Childhood", composer: "Schumann" },
  { file: "08 - Rachmaninov - Piano Concerto No. 2 in C Minor, Op. 18, Adagio sostenuto.mp3", title: "Piano Concerto No. 2, Adagio", composer: "Rachmaninov" },
  { file: "05 - Tchaikovsky - Swan Lake, Scene.mp3", title: "Swan Lake, Scene", composer: "Tchaikovsky" },
  { file: "11 - Handel - Messiah, Pastoral Symphony.mp3", title: "Messiah, Pastoral Symphony", composer: "Handel" },
  { file: "15 - Haydn - Symphony No. 101, in D Major, Andante.mp3", title: "Symphony No. 101, Andante", composer: "Haydn" },
  { file: "03 - Boccherini - String Quintet, in E Major, Op. 11, No. 5, Minuet.mp3", title: "String Quintet, Minuet", composer: "Boccherini" },
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
      audio.src = BASE_URL + encodeURIComponent(next.file);
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
        <span className={styles.track}>{currentTrack.title} — {currentTrack.composer}</span>
      </div>
    </div>
  );
}

export default MusicPlayer;
