const sharp = require("sharp");
const fs = require("fs-extra");
const path = require("path");

async function removeWhiteBackgroundAndInvertColors(inputPath, outputPath) {
  const image = sharp(inputPath);

  // Convert the image to a raw buffer with RGBA channels
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  const processedData = Buffer.from(data);

  for (let i = 0; i < data.length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];
    const alpha = data[i + 3];

    // Use a more sophisticated check for white pixels
    const isWhite = red > 240 && green > 240 && blue > 240;

    if (isWhite) {
      processedData[i + 3] = 0; // Set alpha to 0 (transparent)
    } else {
      // Invert colors only if the pixel is not fully transparent
      if (alpha > 0) {
        processedData[i] = 255 - red; // Invert red
        processedData[i + 1] = 255 - green; // Invert green
        processedData[i + 2] = 255 - blue; // Invert blue
      }
    }
  }

  await sharp(processedData, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .png() // Ensure output is PNG
    .toFile(outputPath);
}

async function processFolder(inputDir, outputDir) {
  try {
    const files = await fs.readdir(inputDir);

    await fs.ensureDir(outputDir);

    for (const file of files) {
      const inputFilePath = path.join(inputDir, file);
      const outputFilePath = path.join(outputDir, `${path.parse(file).name}.png`);

      const stats = await fs.stat(inputFilePath);

      if (stats.isFile() && /\.png$/i.test(file)) {
        console.log(`Processing ${file}...`);
        await removeWhiteBackgroundAndInvertColors(inputFilePath, outputFilePath);
        console.log(`Processed ${file} successfully.`);
      }
    }
  } catch (err) {
    console.error("Error processing folder:", err);
  }
}

// Example usage
const inputDirectory = "./public/images/dsa_a2/reg";
const outputDirectory = "./public/images/dsa_a2/processed";

processFolder(inputDirectory, outputDirectory);
