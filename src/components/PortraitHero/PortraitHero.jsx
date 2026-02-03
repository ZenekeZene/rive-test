import { useEffect } from "react";
import { useRive, Layout, Fit } from "@rive-app/react-webgl2";
import styles from "./PortraitHero.module.css";

function PortraitHero({ onRiveReady }) {
  const { RiveComponent, rive } = useRive({
    src: "/portrait.riv",
    stateMachines: "portrait state machine",
    layout: new Layout({
      fit: Fit.Cover,
      layoutScaleFactor: 1,
    }),
    autoplay: true,
    autoBind: true,
  });

  useEffect(() => {
    if (rive && onRiveReady) {
      onRiveReady(rive);
    }
  }, [rive, onRiveReady]);

  return (
    <section className={styles.portraitHero}>
      <div className={styles.riveWrapper}>
        <RiveComponent />
      </div>
    </section>
  );
}

export default PortraitHero;
