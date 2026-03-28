import { useEffect } from "react";

const OUTFIT_TO_TAB = ["experience", "code", "art", "others"];

/**
 * Listens for "portfolio-action" CustomEvents dispatched by Chat mode
 * and routes each action to the appropriate UI response.
 *
 * @param {React.RefObject} riveRef - ref to the Rive instance (for change_outfit)
 * @param {Function} onMaximizeToggle - callback to toggle hero fullscreen
 */
export function useAvatarActionRouter(riveRef, onMaximizeToggle) {
  useEffect(() => {
    const executeAction = ({ name, args }) => {
      if (name === "scroll_to_section") {
        window.dispatchEvent(new CustomEvent("avatar-navigate-to-section", { detail: { section: args.section } }));
        return;
      }

      if (name === "highlight_project") {
        window.dispatchEvent(new CustomEvent("avatar-navigate-to-section", { detail: { section: "code" } }));
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("avatar-highlight-project", { detail: { project_name: args.project_name } }));
        }, 400);
        return;
      }

      if (name === "open_artwork") {
        window.dispatchEvent(new CustomEvent("avatar-navigate-to-section", { detail: { section: "art" } }));
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("avatar-open-artwork", { detail: { artwork_title: args.artwork_title } }));
        }, 600);
        return;
      }

      if (name === "close_modal") {
        window.dispatchEvent(new CustomEvent("avatar-close-modal"));
        return;
      }

      if (name === "toggle_dark_mode") {
        window.dispatchEvent(new CustomEvent("avatar-toggle-darkmode"));
        return;
      }

      if (name === "maximize_hero") {
        onMaximizeToggle();
        return;
      }

      if (name === "switch_language") {
        window.dispatchEvent(new CustomEvent("avatar-switch-language", { detail: { language: args.language } }));
        return;
      }

      if (name === "change_outfit") {
        const outfit = args.outfit;
        if (riveRef.current) {
          const vmi = riveRef.current.viewModelInstance;
          if (vmi) {
            const outfitProp = vmi.number("outfit");
            if (outfitProp) outfitProp.value = outfit;
            const matrixProp = vmi.boolean("matrixEnabled");
            if (matrixProp) matrixProp.value = outfit === 1;
            const canvasProp = vmi.boolean("canvasEnabled");
            if (canvasProp) canvasProp.value = outfit === 2;
          }
        }
        const tabId = OUTFIT_TO_TAB[outfit];
        if (tabId) {
          window.dispatchEvent(new CustomEvent("avatar-navigate-to-section", { detail: { section: tabId } }));
        }
        return;
      }
    };

    const handler = (e) => {
      const actions = e.detail?.actions;
      if (!actions?.length) return;
      actions.forEach((action, i) => {
        setTimeout(() => executeAction(action), i * 400);
      });
    };

    window.addEventListener("portfolio-action", handler);
    return () => window.removeEventListener("portfolio-action", handler);
  }, [riveRef, onMaximizeToggle]);
}
