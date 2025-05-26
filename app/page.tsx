"use client";

import { useState, useEffect } from "react";
import { CalendarDays, Clock, Sun } from "lucide-react";
import CurrentTime from "@/components/CurrentTime";
import WeatherInfo from "@/components/WeatherInfo";
import NewsPage from "@/components/NewsPage";

export default function Home() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );
  // FIXME
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => console.error("位置情報エラー:", err)
    );
  }, []);

  useEffect(() => {
    if (!location) return;

    const fetchWeather = async () => {
      setLoading(true);
      const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&units=metric&lang=ja`
        );
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.error("天気情報取得失敗:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  const today = new Date().toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });

  return (
    <main className="min-h-screen bg-white text-black font-sans">
      <div className="max-w-screen-sm mx-auto px-4 py-6 space-y-4">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center text-sm text-gray-600 gap-1">
            <CalendarDays size={16} />
            <span>{today}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 gap-1">
            <Clock size={16} />
            <CurrentTime />
          </div>
          <div className="flex items-center text-sm text-gray-600 gap-2">
            <Sun size={16} />
            <WeatherInfo weather={weather} loading={loading} />
          </div>
        </div>
        <NewsPage />
      </div>
    </main>
  );
}
