// One-time image optimizer: node scripts/images.mjs <dir with originals downloaded from the live site>
// Writes responsive WebP files to static/img/ and prints their dimensions (copy them into scripts/site.mjs › IMG).
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { readdirSync, mkdirSync } from "node:fs";
import { join, parse } from "node:path";
const SRC = process.argv[2]; if (!SRC) { console.error("usage: node scripts/images.mjs <src-dir>"); process.exit(1); }
const OUT = fileURLToPath(new URL("../static/img/", import.meta.url)); mkdirSync(OUT, { recursive: true });
const ROOT = fileURLToPath(new URL("../static/", import.meta.url));
const out = {};
for (const f of readdirSync(SRC)) {
  const { name, ext } = parse(f); if (![".png", ".jpeg", ".jpg", ".webp", ".svg"].includes(ext)) continue;
  const src = join(SRC, f);
  if (name === "logo") {
    await sharp(src).resize(512, 512).png({ compressionLevel: 9 }).toFile(join(OUT, "logo-512.png"));
    await sharp(src).resize(160, 160).webp({ quality: 85 }).toFile(join(OUT, "logo-160.webp"));
    await sharp(src).resize(180, 180).flatten({ background: "#0E0C32" }).png().toFile(join(ROOT, "apple-touch-icon.png"));
    await sharp(src).resize(48, 48).png().toFile(join(ROOT, "favicon.png"));
    continue;
  }
  if (name === "logo-new") continue; // byte-identical to logo.png
  const img = sharp(src, { density: ext === ".svg" ? 96 : undefined, limitInputPixels: false });
  const meta = await img.metadata();
  for (const w of [1200, 600]) {
    if (w === 600 && meta.width <= 700) continue;
    const r = await sharp(src, { limitInputPixels: false }).resize({ width: Math.min(w, meta.width), withoutEnlargement: true }).webp({ quality: 78 }).toFile(join(OUT, `${name}-${w === 1200 ? "lg" : "sm"}.webp`));
    out[`${name}-${w === 1200 ? "lg" : "sm"}`] = [r.width, r.height, r.size];
  }
}
console.log(JSON.stringify(out, null, 1));
