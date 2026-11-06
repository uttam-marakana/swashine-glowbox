import { readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(root, "src/assets/images/products");
const outputRoot = path.join(root, "public/images/products");
const manifestPath = path.join(root, "src/data/product-image-metadata.json");
const targetWidths = [400, 800, 1200];
const supportedExtensions = new Set([".png", ".jpg", ".jpeg"]);

async function findImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(directory, entry.name);
      return entry.isDirectory()
        ? findImages(entryPath)
        : supportedExtensions.has(path.extname(entry.name).toLowerCase())
          ? [entryPath]
          : [];
    }),
  );
  return files.flat();
}

await mkdir(outputRoot, { recursive: true });

const images = (await findImages(sourceRoot)).sort();
const manifest = {};

for (const inputPath of images) {
  const relativePath = path.relative(sourceRoot, inputPath);
  const outputSubdirectory = path.dirname(
    path.join(outputRoot, relativePath),
  );
  const image = sharp(inputPath).rotate();
  const { width, height } = await image.metadata();

  if (!width || !height) {
    throw new Error(`Unable to read image dimensions: ${relativePath}`);
  }

  const variants = [];
  for (const targetWidth of targetWidths) {
    if (targetWidth >= width) continue;

    const outputPath = path.join(
      outputSubdirectory,
      `${path.basename(inputPath, path.extname(inputPath))}-${targetWidth}.webp`,
    );
    await mkdir(outputSubdirectory, { recursive: true });
    await sharp(inputPath)
      .rotate()
      .resize({ width: targetWidth, withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toFile(outputPath);

    variants.push({
      width: targetWidth,
      src: `/images/products/${path
        .relative(outputRoot, outputPath)
        .split(path.sep)
        .join("/")}`,
    });
  }

  manifest[relativePath.split(path.sep).join("/")] = {
    width,
    height,
    variants,
  };
}

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Generated ${images.length} product image entries in ${manifestPath}`);
