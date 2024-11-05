"use client";

import { useEffect, useRef, useState } from "react";

const lorenz = (x, y, z, sigma, rho, beta) => {
  const dx = sigma * (y - x);
  const dy = x * (rho - z) - y;
  const dz = x * y - beta * z;
  return [dx, dy, dz];
};

const renderLorenzAttractor = (sigma, rho, beta, x0, y0, z0, numSteps, width, height, bounds, angle) => {
  const positions = new Float32Array(numSteps * 3);

  let x = x0;
  let y = y0;
  let z = z0;

  for (let i = 0; i < numSteps; i++) {
    const [dx, dy, dz] = lorenz(x, y, z, sigma, rho, beta);
    x += dx * 0.01;
    y += dy * 0.01;
    z += dz * 0.01;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }

  // Use fixed bounds
  const { minX, maxX, minY, maxY } = bounds;

  const canvas = Array.from({ length: height }, () => Array.from({ length: width }, () => 0));

  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i];
    const y = positions[i + 1];
    const z = positions[i + 2];

    // Apply 3D rotation around the z-axis
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);
    const rotatedX = x * cosAngle - y * sinAngle;
    const rotatedY = x * sinAngle + y * cosAngle;

    // Project the 3D coordinates onto the 2D plane
    const projectedX = rotatedX;
    const projectedY = rotatedY;

    if (Number.isFinite(minX) && Number.isFinite(maxX) && Number.isFinite(minY) && Number.isFinite(maxY)) {
      const xd = maxX - minX;
      const yd = maxY - minY;
      const col = Math.floor(((projectedX - minX) / xd) * (width - 1));
      const row = Math.floor(((projectedY - minY) / yd) * (height - 1));

      if (row >= 0 && row < height && col >= 0 && col < width) {
        canvas[row][col] = 1;
      }
    }
  }

  return canvas;
};

const getRandomAsciiChar = () => {
  const asciiRange = [33, 126];
  return String.fromCharCode(Math.floor(Math.random() * (asciiRange[1] - asciiRange[0] + 1)) + asciiRange[0]);
};

const AsciiComponent = () => {
  const sigma = 10;
  const rho = 28;
  const beta = 8 / 3;
  const x0 = 0.1;
  const y0 = 0.0;
  const z0 = 0.0;
  const timeStepRef = useRef(1);
  const [width, setWidth] = useState(60);
  const [height, setHeight] = useState(40);

  const [fps, setFps] = useState(0);
  const [angle, setAngle] = useState(0);
  const [rotate, setRotate] = useState(true);
  const lastFrameTimeRef = useRef<number | null>(null);
  const [boardState, setBoardState] = useState<number[][]>([]);
  const animationFrameIdRef = useRef<number | undefined>(undefined);

  // Fixed bounds based on known Lorenz attractor ranges
  const bounds = {
    minX: -40,
    maxX: 40,
    minY: -40,
    maxY: 40,
  };

  useEffect(() => {
    const updateAttractor = () => {
      const currentTime = performance.now();
      if (lastFrameTimeRef.current !== null) {
        const deltaTime = currentTime - lastFrameTimeRef.current;
        const currentFps = Math.round(1000 / deltaTime);
        setFps(currentFps);
      }
      lastFrameTimeRef.current = currentTime;

      if (rotate) {
        setAngle((prevAngle) => prevAngle + 0.005);
      }

      const updatedBoardState = renderLorenzAttractor(
        sigma,
        rho,
        beta,
        x0,
        y0,
        z0,
        timeStepRef.current,
        width,
        height,
        bounds,
        angle
      ) as number[][];

      setBoardState(updatedBoardState);

      const timeStepDiff = 1;
      timeStepRef.current += timeStepDiff;

      animationFrameIdRef.current = requestAnimationFrame(updateAttractor);
    };

    animationFrameIdRef.current = requestAnimationFrame(updateAttractor);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [angle, rotate, width, height]);

  const scale = 50 / width * 5;

  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center text-black h-[26vh] xl:h-[30vh] xl:w-[70vw] w-[80vw] relative">
        <div className="mt-5 scale-[0.3] md:scale-[0.6] xl:scale-[0.8]">
          <div className="relative" style={{ transform: `scale(${scale})` }}>
            {boardState.map((row, i) => (
              <div className="inline-block flex select-none font-mono leading-none" style={{ fontSize: 10 }} key={String(i)}>
                {row.map((tile, j) => (
                  <div
                    className="min-w-[8px] font-bold"
                    key={String(j)}
                    style={{ minWidth: width / 12 }}
                  >
                    {tile === 0 ? '\0' : getRandomAsciiChar()}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row items-center justify-between mt-[10vh] xl:mt-[34vh] md:mt-[26vh] space-y-4 z-100">
        <div className="flex items-center space-x-2 mt-4">
          <label htmlFor="width" className="text-stone-500 text-xs">
            res
          </label>
          <input
            id="width"
            type="range"
            min="50"
            max="300"
            value={width}
            onChange={(e) => { setWidth(Number(e.target.value)); setHeight(Number(e.target.value)/2) }}
            className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            style={{
              accentColor: '#4A90E2', // Optional: Customize the slider color
            }}
          />
          <span className="text-stone-500 text-xs">{width}</span>
        </div>
        <div className="flex flex-row items-center space-x-4 width-[40px]">
          <div className="text-stone-500 text-xs">fps = {fps}</div>
          <div className="text-stone-500 text-xs">t = {timeStepRef.current}</div>
        </div>
      </div>
    </div>
  );
};

export default AsciiComponent;
