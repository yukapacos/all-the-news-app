import { useState } from "react";

type Props = {
  videoId: string;
  title: string;
  description?: string;
  pubDate?: string;
  isRead?: boolean;
};

export default function VideoCard({
  videoId,
  title,
  description,
  pubDate,
  isRead = false,
}: Props) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="p-2 bg-white">
      <h2
        className={`text-sm font-semibold mb-2 ${
          isRead ? "text-gray-400 line-through" : "text-gray-800"
        }`}
      >
        {title}
      </h2>
      {/* 動画埋め込み or スピナー */}
      <div className="w-full aspect-video mb-2 relative bg-gray-100 rounded overflow-hidden">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-t-transparent border-gray-400 rounded-full animate-spin" />
          </div>
        )}

        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          className={`w-full h-full rounded transition-opacity duration-300 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setLoading(false)}
        />
      </div>
      {description && (
        <p
          className={`text-sm mb-1 line-clamp-3 ${
            isRead ? "text-gray-400" : "text-gray-700"
          }`}
        >
          {description}
        </p>
      )}
      {pubDate && (
        <p className="text-xs text-gray-400">
          {new Date(pubDate).toLocaleString("ja-JP")}
        </p>
      )}
    </div>
  );
}
