import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const DEFAULT_DIRS = ["src/assets/2023", "src/assets/2024"];
const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".heic"]);

const args = process.argv.slice(2);
const flags = new Set(args.filter((arg) => arg.startsWith("--")));
const getArgValue = (flag, fallback) => {
  const index = args.indexOf(flag);
  if (index === -1 || index === args.length - 1) {
    return fallback;
  }
  return args[index + 1];
};

const quality = Number(getArgValue("--quality", "80"));
const overwrite = flags.has("--overwrite");
const deleteOriginal = flags.has("--delete-original");
const concurrency = Number(getArgValue("--concurrency", "4"));

const dirsArgIndex = args.indexOf("--dirs");
const targetDirs =
  dirsArgIndex >= 0 && dirsArgIndex < args.length - 1
    ? args.slice(dirsArgIndex + 1).filter((arg) => !arg.startsWith("--"))
    : DEFAULT_DIRS;

const toAbsoluteDir = (dir) => path.resolve(process.cwd(), dir);
const targetDirPaths = targetDirs.map(toAbsoluteDir);

const isSupportedFile = (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  return SUPPORTED_EXTENSIONS.has(ext);
};

const getOutputPath = (filePath) => {
  const dir = path.dirname(filePath);
  const base = path.basename(filePath, path.extname(filePath));
  return path.join(dir, `${base}.webp`);
};

const walkDirectory = async (dirPath) => {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkDirectory(fullPath)));
    } else if (entry.isFile() && isSupportedFile(fullPath)) {
      files.push(fullPath);
    }
  }

  return files;
};

const convertFile = async (filePath) => {
  const outputPath = getOutputPath(filePath);
  if (!overwrite) {
    try {
      await fs.access(outputPath);
      return { filePath, skipped: true };
    } catch {
      // continue
    }
  }

  const ext = path.extname(filePath).toLowerCase();
  const sharpOptions = ext === ".heic" ? { pages: 1 } : {};

  await sharp(filePath, sharpOptions)
    .webp({ quality })
    .toFile(outputPath);

  if (deleteOriginal) {
    await fs.unlink(filePath);
  }

  return { filePath, outputPath, skipped: false };
};

const run = async () => {
  const allFiles = [];
  for (const dirPath of targetDirPaths) {
    try {
      const files = await walkDirectory(dirPath);
      allFiles.push(...files);
    } catch (error) {
      console.error(`Failed to read directory ${dirPath}:`, error);
    }
  }

  if (allFiles.length === 0) {
    console.log("No supported images found.");
    return;
  }

  console.log(`Found ${allFiles.length} images to convert.`);

  let index = 0;
  const workers = Array.from({ length: Math.max(1, concurrency) }, async () => {
    while (index < allFiles.length) {
      const current = allFiles[index];
      index += 1;
      try {
        const result = await convertFile(current);
        if (result.skipped) {
          console.log(`Skipped (exists): ${current}`);
        } else {
          console.log(`Converted: ${current}`);
        }
      } catch (error) {
        console.error(`Failed to convert ${current}:`, error);
      }
    }
  });

  await Promise.all(workers);
  console.log("Conversion complete.");
};

run().catch((error) => {
  console.error("Conversion failed:", error);
  process.exit(1);
});
