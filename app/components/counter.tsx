"use client";
import { useEffect, useState } from "react";

type CounterProps = {
  from?: number;
  to: number;
  duration?: number;
};

export function Counter({ from = 0, to, duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let start = from;
    const increment = (to - from) / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= to) {
        setCount(to);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [from, to, duration]);

  return <span>{count}</span>;
}
