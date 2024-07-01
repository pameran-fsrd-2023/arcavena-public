const Jimp = require("jimp");
const path = require("path");
const fs = require("fs").promises;
const webp = require("webp-converter");

const BASE_URL = process.env.BASE_URL;

const generatePreview = async (filePath) => {
  try {
    // Check if the filePath is a file and not a directory
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) {
      throw new Error(`${filePath} is a directory, not a file`);
    }

    let isWebp = false;
    let tempFilePath = filePath;

    // Check if the file is a .webp and convert it to .png if necessary
    if (filePath.endsWith(".webp")) {
      isWebp = true;
      tempFilePath = filePath.replace(/\.webp$/, ".png");
      await webp.dwebp(filePath, tempFilePath, "-o");
    }

    const image = await Jimp.read(tempFilePath);
    const previewPath = filePath.replace(/(\.\w+)$/, "_preview$1"); // e.g., image.jpg -> image_preview.jpg

    // Calculate the aspect ratio
    const aspectRatio = image.bitmap.width / image.bitmap.height;
    const targetWidth = 200;
    const targetHeight = 200;

    // Resize the image while maintaining the aspect ratio
    if (aspectRatio > 1) {
      // Landscape
      image.resize(Jimp.AUTO, targetHeight);
    } else {
      // Portrait or square
      image.resize(targetWidth, Jimp.AUTO);
    }

    // Crop the image to fit the 200x200 dimensions
    image.cover(targetWidth, targetHeight);

    await image.writeAsync(previewPath);

    const temp = previewPath.split(path.sep);
    const previewUrl = `${BASE_URL}/uploads/${temp[temp.length - 1]}`;

    // Remove the temporary .png file if it was converted from .webp
    if (isWebp) {
      await fs.unlink(tempFilePath).catch((err) => {
        console.error(`Error deleting temporary file: ${tempFilePath}`, err);
      });
    }

    return previewUrl;
  } catch (error) {
    console.error("Error generating preview:", error);
    throw error;
  }
};

module.exports = generatePreview;
