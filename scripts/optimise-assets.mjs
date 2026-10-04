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

// UN SDG icons. The client supplied animated GIFs (1000x1000, 0.7–2.9 MB
// each) that cycle the label through the six UN languages. The site uses a
// still of the first frame, which is the English artwork: the animations
// weighed ~800 KB together, over a third of the mobile page, and showed
// non-English labels most of the time. 240px is 2x the 120px render.
//
// The client's files for goals 2 and 17 are swapped (sdg-2.gif draws the
// Partnerships icon, sdg-17.gif draws Zero Hunger), so outputs are keyed by
// the goal the file actually depicts, not by its filename.
const SDG_SIZE = 240;
const SDG_SOURCES = { 1: "sdg-1.gif", 2: "sdg-17.gif", 4: "sdg-4.gif", 17: "sdg-2.gif" };

for (const [goal, file] of Object.entries(SDG_SOURCES)) {
  const out = `public/sdg/sdg-${goal}.webp`;
  await sharp(`${SRC}/${file}`, { page: 0, pages: 1, limitInputPixels: false })
    .resize(SDG_SIZE, SDG_SIZE)
    .webp({ quality: 82, effort: 6 })
    .toFile(out);
  outputs.push(out);
}

// Client photos (design/assets/photos, originals as supplied). next/image
// resizes and converts these on demand, so they only need to be big enough
// for 2x of their largest render: the hero circle is ~600px, event photos
// ~440px wide. The hero is a portrait shot cropped to its top square so both
// faces sit inside the solid centre of the circular fade mask.
const PHOTOS = [
  // Hero: the full uncropped landscape photo (the old circular crop cut off
  // the outer faces). Shown edge to edge at about 780px, so 1600 is 2x.
  { src: "hero-students.jpg", out: "public/images/hero-students.jpg", width: 1600 },

  // "What we do" cards. Each is at most ~470px wide on screen. Food Security
  // uses the food-outreach photograph generated in the Events block below.
  { src: "programme-education.jpg", out: "public/images/programme-education.jpg", width: 1000 },
  { src: "volunteer-school-hall.jpg", out: "public/images/programme-youth.jpg", width: 1000 },
  { src: "programme-women.jpg", out: "public/images/programme-women.jpg", width: 1000 },
  { src: "programme-community.jpg", out: "public/images/programme-community.jpg", width: 1000 },
  { src: "programme-csr.jpg", out: "public/images/programme-csr.jpg", width: 1000 },

  // People shown in "Our story".
  { src: "volunteer-pulpit.jpg", out: "public/images/people-founder.jpg", width: 900 },
  { src: "volunteer-outdoor.jpg", out: "public/images/people-grand-patron.jpg", width: 900 },
  { src: "people-patrons.jpg", out: "public/images/people-patrons.jpg", width: 1200 },
  { src: "people-volunteers.jpg", out: "public/images/people-volunteers.jpg", width: 1200 },

  // Events: current opportunities. Food Outreach 2026 waits for the client's
  // flier; the food-outreach photograph below now serves only the Food
  // Security card.
  { src: "event-food-outreach.jpg", out: "public/images/event-food-outreach.jpg", width: 1200 },
  { src: "event-global-skills.jpg", out: "public/images/event-global-skills.jpg", width: 1200 },
  { src: "event-love-in-action.jpg", out: "public/images/event-love-in-action.jpg", width: 1000 },

  // Events: past. One photograph per grouped card.
  { src: "past-transcend.jpg", out: "public/images/past-transcend.jpg", width: 1000 },
  { src: "past-food-outreach.jpg", out: "public/images/past-food-outreach.jpg", width: 1000 },
  { src: "past-school-outreach.jpg", out: "public/images/past-school-outreach.jpg", width: 1000 },

  // News & Stories: shown beside the review from the person it pictures.
  { src: "review-toluwalade.jpg", out: "public/images/review-toluwalade.jpg", width: 1200 },
];

// Friends of Love & Light logo: supplied on a large white canvas, so trim the
// margin to let it sit snugly in its chip. 480px wide is 3x its render size.
await sharp("design/assets/friends-logo.png")
  .flatten({ background: "#ffffff" })
  .trim({ background: "#ffffff", threshold: 12 })
  .resize({ width: 480 })
  .webp({ quality: 92, effort: 6 })
  .toFile("public/images/friends-logo.webp");
outputs.push("public/images/friends-logo.webp");

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
