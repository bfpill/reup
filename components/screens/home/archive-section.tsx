"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const getRandomAsciiChar = () => {
  const letters = ['M', 'A', 'X', 'W', 'E', 'L', 'L'];
  return letters[Math.floor(Math.random() * letters.length)];
};

function AnimatedAsciiM({ 
  imageUrl, 
  isExiting, 
  onExitComplete 
}: { 
  imageUrl: string; 
  isExiting: boolean;
  onExitComplete: () => void;
}) {
  const [asciiImage, setAsciiImage] = useState<string[][]>([]);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      const targetWidth = 100;
      const targetHeight = 110;

      canvas.width = targetWidth;
      canvas.height = targetHeight;
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight);
      
      const { data } = imageData;
      const asciiArray = Array.from({ length: targetHeight }, () => 
        Array.from({ length: targetWidth }, () => ' ')
      );

      for (let y = 0; y < targetHeight; y++) {
        for (let x = 0; x < targetWidth; x++) {
          const index = (y * targetWidth + x) * 4;
          const r = data[index];
          const g = data[index + 1];
          const b = data[index + 2];
          const a = data[index + 3];

          if (a > 128) {
            const brightness = (r + g + b) / 3;
            asciiArray[y][x] = brightness < 128 ? '0' : ' ';
          }
        }
      }

      setAsciiImage(asciiArray);
    };
  }, [imageUrl]);

  useEffect(() => {
    if (isExiting && asciiImage.length > 0) {
      const totalDuration = asciiImage.length * 8 + 200;
      const timer = setTimeout(onExitComplete, totalDuration);
      return () => clearTimeout(timer);
    }
  }, [isExiting, asciiImage.length, onExitComplete]);

  return (
    <div className="relative w-full">
      <div className="flex flex-col">
        <div className="mt-5">
          {asciiImage.map((row, i) => (
            <motion.div
              className="inline-block flex select-none font-mono leading-none"
              key={String(i)}
              animate={isExiting ? {
                x: 800,
                opacity: 0,
              } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.015,
                ease: "easeIn",
              }}
            >
              {row.map((char, j) => (
                <div className="min-w-[8px] font-bold" style={{ color: '#000000' }} key={String(j)}>
                  {char === '0' ? ' ' : getRandomAsciiChar()}
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ArchiveSection({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<'idle' | 'exiting' | 'archive'>('idle');

  const handleClick = () => {
    if (state === 'idle') {
      setState('exiting');
    }
  };

  const handleExitComplete = () => {
    setState('archive');
  };

  return (
    <div className="mt-32 min-h-[880px]" style={{ backgroundColor: '#ffffff' }}>
      {state !== 'archive' && (
        <button
          type="button"
          onClick={handleClick}
          className={`h-24 w-24 cursor-pointer transition-opacity ${
            state === 'idle' ? 'opacity-50 hover:opacity-100' : 'opacity-100'
          }`}
          disabled={state === 'exiting'}
        >
          <AnimatedAsciiM
            imageUrl="/images/daily-notes/2024-11-4/M.jpeg"
            isExiting={state === 'exiting'}
            onExitComplete={handleExitComplete}
          />
        </button>
      )}
      {state === 'archive' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-lg mb-4" style={{ color: '#000000' }}>archive</h2>
          {children}
        </motion.div>
      )}
    </div>
  );
}
