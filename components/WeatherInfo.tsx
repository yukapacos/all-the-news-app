import { Loader2 } from "lucide-react";

type Props = {
  // FIXME
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  weather: any;
  loading: boolean;
};

export default function WeatherInfo({ weather, loading }: Props) {
  if (loading) {
    return <Loader2 className="animate-spin w-4 h-4 text-gray-500" />;
  }

  if (!weather) {
    return <span className="text-xs text-gray-400">取得失敗</span>;
  }

  const icon = weather.weather?.[0]?.icon;
  const temp =
    weather.main?.temp !== undefined ? Math.round(weather.main.temp) : null;
  const desc = weather.weather?.[0]?.description;
  const city = weather.name;

  if (temp == null) return <div className="text-xs">天気情報取得失敗</div>;

  return (
    <div className="flex items-center gap-1 text-sm text-gray-700">
      {icon && (
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={desc}
          className="w-5 h-5"
        />
      )}
      <span>{city}</span>
      <span>{desc}</span>
      <span>{temp}℃</span>
    </div>
  );
}
