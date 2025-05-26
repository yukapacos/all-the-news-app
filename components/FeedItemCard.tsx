import { formatDate } from "@/app/util/formatDate";
import VideoCard from "./VideoCard";

type Props = {
  item: {
    link: string;
    title: string;
    description?: string;
    pubDate?: string;
    thumbnail?: string;
    videoId?: string;
  };
  isRead: boolean;
  onMarkAsRead: (link: string) => void;
};

export default function FeedItemCard({ item, isRead, onMarkAsRead }: Props) {
  const { link, title, description, pubDate, thumbnail, videoId } = item;

  if (videoId) {
    return (
      <li className="flex flex-col gap-2 border-b pb-4">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onMarkAsRead(link)}
          className="block"
        >
          <VideoCard
            videoId={videoId}
            title={title}
            description={description}
            pubDate={pubDate}
            isRead={isRead}
          />
        </a>
      </li>
    );
  }

  return (
    <li className="flex flex-col gap-2 border-b pb-4">
      <div className="flex items-start gap-3">
        {thumbnail && (
          <img
            src={thumbnail}
            alt=""
            className="w-20 h-14 object-cover rounded border"
          />
        )}
        <div className="flex-1">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onMarkAsRead(link)}
            className={`block text-sm font-semibold hover:underline ${
              isRead ? "text-gray-400 line-through" : "text-gray-800"
            }`}
          >
            {title}
          </a>
          <p className="text-xs text-gray-500">{formatDate(pubDate)}</p>
          {description && (
            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
              {description}
            </p>
          )}
        </div>
      </div>
    </li>
  );
}
