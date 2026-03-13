#!/bin/bash
# Compress all video and image assets in-place
# - Videos: H.265 CRF 28, no audio, same resolution
# - JPGs: quality 82 via sips (only if result is smaller)

ROOT_DIR="$(dirname "$0")/.."
ROOT_DIR="$(cd "$ROOT_DIR" && pwd)"
PUBLIC_DIR="$ROOT_DIR/public"

echo "=== Compressing all MP4s (H.265 CRF 28, no audio) ==="
find "$PUBLIC_DIR" -name "*.mp4" -print0 | while IFS= read -r -d '' f; do
  size_before=$(stat -f%z "$f")
  tmp="${f}.tmp.mp4"
  rel="${f#$PUBLIC_DIR/}"
  echo "  Processing: $rel ($(echo "scale=1; $size_before/1048576" | bc) MB)"
  if ! ffmpeg -y -i "$f" -c:v libx265 -crf 28 -preset medium -an -tag:v hvc1 -movflags +faststart "$tmp" 2>/dev/null; then
    echo "    Failed (ffmpeg error)"
    rm -f "$tmp"
    continue
  fi
  size_after=$(stat -f%z "$tmp")
  if [ "$size_after" -lt "$size_before" ]; then
    mv "$tmp" "$f"
    echo "    $(echo "scale=1; $size_before/1048576" | bc) MB -> $(echo "scale=1; $size_after/1048576" | bc) MB (saved $(echo "scale=0; ($size_before-$size_after)*100/$size_before" | bc)%)"
  else
    rm -f "$tmp"
    echo "    Skipped (already optimal)"
  fi
done

echo ""
echo "=== Compressing JPGs (quality 82) ==="
find "$PUBLIC_DIR" -name "*.jpg" -print0 | while IFS= read -r -d '' f; do
  size_before=$(stat -f%z "$f")
  rel="${f#$PUBLIC_DIR/}"
  tmp="${f}.tmp.jpg"
  cp "$f" "$tmp"
  sips -s formatOptions 82 "$tmp" --out "$tmp" >/dev/null 2>&1
  size_after=$(stat -f%z "$tmp")
  if [ "$size_after" -lt "$size_before" ]; then
    mv "$tmp" "$f"
    echo "  $rel: $(echo "scale=0; $size_before/1024" | bc)KB -> $(echo "scale=0; $size_after/1024" | bc)KB (-$(echo "scale=0; ($size_before-$size_after)*100/$size_before" | bc)%)"
  else
    rm -f "$tmp"
  fi
done

echo ""
echo "=== Done ==="
echo "Videos total: $(find "$PUBLIC_DIR" -name "*.mp4" -exec stat -f%z {} + | awk '{s+=$1} END{printf "%.1f MB\n", s/1048576}')"
echo "JPGs total: $(find "$PUBLIC_DIR" -name "*.jpg" -exec stat -f%z {} + | awk '{s+=$1} END{printf "%.1f MB\n", s/1048576}')"
