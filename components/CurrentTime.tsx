"use client";

import { useEffect, useState } from "react";

function CurrentTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("ja-JP", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(formatted);
    };

    update();
    const intervalId = setInterval(update, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return <span className="text-sm text-gray-600 font-mono">{time}</span>;
}

export default CurrentTime;
