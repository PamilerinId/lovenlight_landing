// One-off asset pipeline: turns the client's raw handoff files in design/assets
// into web-sized outputs. Run with `npm run assets`. Originals never ship.
import sharp from "sharp";
import { mkdir, stat } from "node:fs/promises";

const SRC = "design/assets";
const GROUND = "#FCFBF0";

await Promise.all(
  ["public/images", "public/sdg", "assets/images", "app"].map((d) =>
    mkdir(d, { recursive: true })
  )
);

const outputs = [];

// Logo lockup (5928x3202 transparent PNG). Max render height is 64px, so
// 192px tall is 3x for high-DPI screens. Palette PNG keeps alpha and is small.
await sharp(`${SRC}/logo.png`)
  .resize({ height: 192 })
  .png({ compressionLevel: 9, palette: true })
  .toFile("public/images/logo.png");
outputs.push("public/images/logo.png");

// Larger copy used only at build time by the Open Graph image route.
await sharp(`${SRC}/logo.png`)
  .resize({ height: 400 })
  .png({ compressionLevel: 9 })
  .toFile("assets/images/logo-og.png");
outputs.push("assets/images/logo-og.png");

// Favicons: the lockup is wide, so it is placed (not cropped) on a square of
// the page ground colour. Next.js picks up app/icon.png and app/apple-icon.png.
for (const [file, size, pad] of [
  ["app/icon.png", 512, 56],
  ["app/apple-icon.png", 180, 20],
]) {
  const inner = await sharp(`${SRC}/logo.png`)
    .resize({ width: size - pad * 2, height: size - pad * 2, fit: "inside" })
    .png()
    .toBuffer();
  await sharp({
    create: { width: size, height: size, channels: 4, background: GROUND },
  })
    .composite([{ input: inner, gravity: "centre" }])
    .png({ compressionLevel: 9 })
    .toFile(file);
  outputs.push(file);
}

// UN SDG icons: animated GIFs at 1000x1000 (0.7–2.9 MB each) rendered at
// 120px. Animated WebP at 240px (2x) keeps the motion at a fraction of the
// size.
//
// The client's files for goals 2 and 17 are swapped (sdg-2.gif draws the
// Partnerships icon, sdg-17.gif draws Zero Hunger), so outputs are keyed by
// the goal the file actually depicts, not by its filename. Each animation
// cycles the label through the six UN languages; that is by design.
//
// The Partnerships animation has 361 frames of dense motion, so every other
// frame is dropped (delays summed) to keep it in the same weight class.
const SDG_SIZE = 240;
const SDG_SOURCES = { 1: "sdg-1.gif", 2: "sdg-17.gif", 4: "sdg-4.gif", 17: "sdg-2.gif" };
const FRAME_STEP = { 17: 2 };

async function sdgFrames(src, step) {
  const meta = await sharp(src, { animated: true, limitInputPixels: false }).metadata();
  const total = meta.pages ?? 1;
  const delays = meta.delay ?? [];
  const frames = [];
  const delay = [];
  for (let i = 0; i < total; i += step) {
    frames.push(
      await sharp(src, { page: i, pages: 1, limitInputPixels: false })
        .resize(SDG_SIZE, SDG_SIZE)
        .png()
        .toBuffer()
    );
    let d = 0;
    for (let j = i; j < Math.min(i + step, total); j++) d += delays[j] ?? 100;
    delay.push(d);
  }
  return { frames, delay, loop: meta.loop ?? 0 };
}

for (const [goal, file] of Object.entries(SDG_SOURCES)) {
  const n = Number(goal);
  const src = `${SRC}/${file}`;
  const out = `public/sdg/sdg-${n}.webp`;
  const step = FRAME_STEP[n] ?? 1;
  if (step === 1) {
    await sharp(src, { animated: true, limitInputPixels: false })
      .resize(SDG_SIZE, SDG_SIZE)
      .webp({ quality: 70, effort: 6 })
      .toFile(out);
  } else {
    const { frames, delay, loop } = await sdgFrames(src, step);
    await sharp(frames, { join: { animated: true } })
      .webp({ quality: 70, effort: 6, delay, loop })
      .toFile(out);
  }
  outputs.push(out);
}

// Client photos (design/assets/photos, originals as supplied). next/image
// resizes and converts these on demand, so they only need to be big enough
// for 2x of their largest render: the hero circle is ~600px, event photos
// ~440px wide. The hero is a portrait shot cropped to its top square so both
// faces sit inside the solid centre of the circular fade mask.
const PHOTOS = [
  { src: "hero-james-sunmi.jpg", out: "public/images/hero-james-sunmi.jpg", square: "top", width: 1400 },
  { src: "event-food-outreach.jpg", out: "public/images/event-food-outreach.jpg", width: 1200 },
  { src: "event-global-skills.jpg", out: "public/images/event-global-skills.jpg", width: 1200 },
  // "Get involved" mosaic tiles, each at most ~470px wide on screen.
  { src: "volunteer-school-hall.jpg", out: "public/images/volunteer-school-hall.jpg", width: 1080 },
  { src: "volunteer-pulpit.jpg", out: "public/images/volunteer-pulpit.jpg", width: 1200 },
  { src: "volunteer-rebirth.jpg", out: "public/images/volunteer-rebirth.jpg", width: 1200 },
  { src: "volunteer-outdoor.jpg", out: "public/images/volunteer-outdoor.jpg", width: 1000 },
];

for (const p of PHOTOS) {
  let img = sharp(`${SRC}/photos/${p.src}`).rotate();
  if (p.square) {
    const { width, height } = await img.metadata();
    const side = Math.min(width, height);
    const top = p.square === "top" ? 0 : Math.round((height - side) / 2);
    const left = Math.round((width - side) / 2);
    img = img.extract({ left, top, width: side, height: side });
  }
  await img
    .resize({ width: p.width, withoutEnlargement: true })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(p.out);
  outputs.push(p.out);
}

for (const f of outputs) {
  const { size } = await stat(f);
  console.log(`${f.padEnd(28)} ${(size / 1024).toFixed(0).padStart(5)} KB`);
}
