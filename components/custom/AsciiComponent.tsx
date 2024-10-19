"use client";

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const lorenz = (x, y, z, sigma, rho, beta) => {
  const dx = sigma * (y - x);
  const dy = x * (rho - z) - y;
  const dz = x * y - beta * z;
  return [dx, dy, dz];
};

const renderLorenzAttractor = (
  sigma,
  rho,
  beta,
  x0,
  y0,
  z0,
  numSteps,
  width,
  height,
  bounds
) => {
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

  const canvas = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => 0)
  );

  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i];
    const y = positions[i + 1];

    if (
      isFinite(minX) &&
      isFinite(maxX) &&
      isFinite(minY) &&
      isFinite(maxY)
    ) {
      const xd = maxX - minX;
      const yd = maxY - minY;
      const col = Math.floor(((x - minX) / xd) * (width - 1));
      const row = Math.floor(((y - minY) / yd) * (height - 1));

      if (row >= 0 && row < height && col >= 0 && col < width) {
        canvas[row][col] = 1;
      }
    }
  }

  return canvas;
};

const AsciiComponent = () => {
  const sigma = 10;
  const rho = 28;
  const beta = 8 / 3;
  const x0 = 0.1;
  const y0 = 0.0;
  const z0 = 0.0;
  const timeStepRef = useRef(1);
  const width = 100;
  const height = 75;

  const [fps, setFps] = useState(0);
  const lastFrameTimeRef = useRef(null);
  const [boardState, setBoardState] = useState([]);
  const animationFrameIdRef = useRef();

  // Fixed bounds based on known Lorenz attractor ranges
  const bounds = {
    minX: -25,
    maxX: 25,
    minY: -30,
    maxY: 30,
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
        bounds
      );
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
  }, []);

  return (
    <div className="text-black min-h-[700px] w-full flex items-center justify-center">
      <div className="">
        {boardState.map((row, i) => (
          <div
            className="flex font-mono leading-none inline-block select-none"
            style={{ fontSize: 8 }}
            key={i}
          >
            {row.map((tile, j) => (
              <div className="min-w-[7px]" key={j}>
                {tile === 0 ? '\0' : '1'}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="text-xs text-stone-500 absolute bottom-10 right-10 mr-20">
        fps = {fps}
      </div>
      <div className="text-xs text-stone-500 absolute bottom-10 right-10">
        t = {timeStepRef.current}
      </div>
    </div>
  );
};

export default AsciiComponent;
