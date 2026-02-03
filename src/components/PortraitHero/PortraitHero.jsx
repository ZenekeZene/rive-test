import { useEffect, useState } from "react";
import { useRive, Layout, Fit } from "@rive-app/react-webgl2";
import styles from "./PortraitHero.module.css";
import InteractionHint from "../InteractionHint/InteractionHint";

function PortraitHero({ onRiveReady, isMaximized, title = "Zeneke" }) {
  const [showHint, setShowHint] = useState(true);
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

  useEffect(() => {
    if (rive) {
      // eslint-disable-next-line react-hooks/immutability
      rive.layout = new Layout({
        fit: isMaximized ? Fit.Layout : Fit.Cover,
        layoutScaleFactor: 1,
      });
      rive.resizeDrawingSurfaceToCanvas();
    }
  }, [rive, isMaximized]);

  return (
    <section className={styles.portraitHero}>
      <h1 className={`${styles.mobileTitle} ${isMaximized ? styles.hidden : ""}`}>{title}</h1>
      <div className={styles.riveWrapper}>
        <RiveComponent />
        {showHint && <InteractionHint onDismiss={() => setShowHint(false)} />}
      </div>
    </section>
  );
}

export default PortraitHero;
