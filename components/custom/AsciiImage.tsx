"use client";

import { useEffect, useState } from "react";

const getRandomAsciiChar = () => {
  const letters = ['M', 'A', 'X', 'W', 'E', 'L', 'L'];
  return letters[Math.floor(Math.random() * letters.length)];
};

const AsciiImageComponent = ({ imageUrl }) => {
  const [asciiImage, setAsciiImage] = useState<string[][]>([]);

  const processImage = (imageData, targetWidth, targetHeight) => {
    const { data } = imageData;
    const asciiArray = Array.from({ length: targetHeight }, () => Array.from({ length: targetWidth }, () => ' '));
  
    for (let y = 0; y < targetHeight; y++) {
      for (let x = 0; x < targetWidth; x++) {
        const index = (y * targetWidth + x) * 4;
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        const a = data[index + 3];
  
        if (a > 128) { // Consider pixel if alpha is more than half
          const brightness = (r + g + b) / 3;
          asciiArray[y][x] = brightness < 128 ? '0' : ' ';
        }
      }
    }
  
    return asciiArray;
  };

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      const targetWidth = 100;
      const targetHeight = 110; 

      canvas.width = targetWidth;
      canvas.height = targetHeight;
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight);
      const updatedAsciiImage = processImage(imageData, targetWidth, targetHeight);
      setAsciiImage(updatedAsciiImage);
    };
  }, [imageUrl]);

  return (
    <div className="relative w-full">
      <div className="flex flex-col">
        <div className="mt-5">
          {asciiImage.map((row, i) => (
            <div className="inline-block flex select-none font-mono leading-none" key={String(i)}>
              {row.map((char, j) => (
                <div
                className="min-w-[8px] font-bold"
                key={String(j)}
              >
                {char === '0' ? ' ' : getRandomAsciiChar()}
              </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AsciiImageComponent;