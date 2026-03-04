const MAX_SIZE = 600;

function resizeImage(canvas) {
  const { width, height } = canvas;
  const scale = Math.min(MAX_SIZE / width, MAX_SIZE / height, 1);
  if (scale === 1) return canvas;

  const w = Math.round(width * scale);
  const h = Math.round(height * scale);
  const offscreen = document.createElement("canvas");
  offscreen.width = w;
  offscreen.height = h;
  const ctx = offscreen.getContext("2d");
  ctx.drawImage(canvas, 0, 0, w, h);
  return offscreen;
}

function isBlank(dataUrl) {
  // A blank PNG toDataURL is typically very short
  return !dataUrl || dataUrl.length < 1000;
}

function captureViaReadPixels(canvas) {
  const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
  if (!gl) return null;

  const { drawingBufferWidth: w, drawingBufferHeight: h } = gl;
  const pixels = new Uint8Array(w * h * 4);
  gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

  // WebGL readPixels gives bottom-up, flip it
  const offscreen = document.createElement("canvas");
  offscreen.width = w;
  offscreen.height = h;
  const ctx = offscreen.getContext("2d");
  const imageData = ctx.createImageData(w, h);

  for (let row = 0; row < h; row++) {
    const srcOffset = (h - row - 1) * w * 4;
    const dstOffset = row * w * 4;
    imageData.data.set(pixels.subarray(srcOffset, srcOffset + w * 4), dstOffset);
  }

  ctx.putImageData(imageData, 0, 0);
  return offscreen;
}

/**
 * Captures the Rive WebGL2 canvas and returns a Blob (PNG).
 * Must be called inside requestAnimationFrame for WebGL buffers to be valid.
 */
export function captureRiveCanvas() {
  return new Promise((resolve, reject) => {
    requestAnimationFrame(() => {
      try {
        const canvas = document.querySelector(".leftPanel canvas") ||
          document.querySelector("canvas");
        if (!canvas) {
          reject(new Error("Canvas not found"));
          return;
        }

        // Try toDataURL first
        let dataUrl = canvas.toDataURL("image/png");

        if (isBlank(dataUrl)) {
          // Fallback: readPixels
          const fallbackCanvas = captureViaReadPixels(canvas);
          if (!fallbackCanvas) {
            reject(new Error("Could not capture canvas"));
            return;
          }
          const resized = resizeImage(fallbackCanvas);
          resized.toBlob((blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Failed to create blob"));
          }, "image/png");
          return;
        }

        // Resize via offscreen canvas
        const img = new Image();
        img.onload = () => {
          const tempCanvas = document.createElement("canvas");
          tempCanvas.width = img.width;
          tempCanvas.height = img.height;
          const ctx = tempCanvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          const resized = resizeImage(tempCanvas);
          resized.toBlob((blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Failed to create blob"));
          }, "image/png");
        };
        img.onerror = () => reject(new Error("Failed to load captured image"));
        img.src = dataUrl;
      } catch (err) {
        reject(err);
      }
    });
  });
}
