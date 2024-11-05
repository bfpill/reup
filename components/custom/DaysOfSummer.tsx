"use client";

import { useEffect, useState } from "react";


export const SummerDaysGraph = ({ day }: { day?: Date }) => {

  const startDate = new Date("2024-11-01");
  const endDate = new Date("2025-03-01");
  const [totalDays, setTotalDays] = useState(undefined);
  const [daysPassed, setDaysPassed] = useState(undefined);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const today = day ? new Date(day) : new Date();
    const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysPassed = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    setTotalDays(totalDays);
    setDaysPassed(daysPassed);
    console.log(totalDays);
  }, []);


  if (totalDays === undefined || daysPassed === undefined) return null;

  const columns = [];
  const weeksCount = Math.ceil(totalDays / 7);

  for (let week = 0; week < weeksCount; week++) {
    const weekColumn = [];
    for (let day = 0; day < 7; day++) {
      const dayIndex = week * 7 + day;
      if (dayIndex < totalDays) {
        weekColumn.push(
          <div
            key={dayIndex}
            className={`w-3 h-3 mb-1 mr-1 rounded-[2px] ${dayIndex < daysPassed ? 'bg-blue-500' : 'bg-gray-300'}`}
          />
        );
      }
    }
    columns.push(
      <div key={week} className="flex flex-col">
        {weekColumn}
      </div>
    );
  }

  return <div>
    <h2>{daysPassed} days into summer</h2>
    <div className="flex">{columns}</div>
  </div>
};

export const DaysOfSummer = () => {
  const startDate = new Date("2024-11-01");
  const endDate = new Date("2025-03-01");
  const [totalDays, setTotalDays] = useState(undefined);
  const [daysPassed, setDaysPassed] = useState(undefined);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const today = new Date();
    const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysPassed = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    setTotalDays(totalDays);
    setDaysPassed(daysPassed);
    console.log(totalDays);
  }, []);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="flex flex-row text-center items-center">
      <div className="text-white bg-pink-500 bold opacity-0.5 rounded-full p-2 px-4 text-xs">
        <h1>
          {`${daysPassed} / ${totalDays} DAYS INTO SUMMER BREAK`}
        </h1>
      </div>
      <div className="text-white ml-2 bg-blue-500 bold opacity-0.5 rounded-full p-2 px-4 text-xs transition-colors duration-100">
        <a href="/daily-notes" className="text-white underline ">
          Todays Note
        </a>
      </div>

    </div>
  );
};
