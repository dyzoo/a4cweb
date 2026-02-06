"use client";
import { useEffect, useState } from "react";

export function Counter({ from = 0, to, duration = 2000 }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let start = 0;
    const end = parseInt(to);
    if (start === end) return;

    let totalMilSecDur = duration;
    let incrementTime = 20; // 0.02 seconds

    let timer = setInterval(() => {
      start += Math.ceil(end / (totalMilSecDur / incrementTime));
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [to, duration]);

  return <span>{count.toLocaleString()}</span>;
}
