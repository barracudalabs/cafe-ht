import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) =>
    date.toLocaleTimeString("en-MY", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  const formatDate = (date) =>
    date.toLocaleDateString("en-MY", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="text-right text-sm text-gray-700 dark:text-gray-300">
      <div>{formatDate(time)}</div>
      <div className="font-mono text-xl">{formatTime(time)}</div>
    </div>
  );
}
