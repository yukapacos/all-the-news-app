import { FeedItem } from "@/types/FeedItem";

type Props = {
  feeds: FeedItem[];
  selectedTab: number;
  onSelect: (index: number) => void;
};

export default function FeedTabs({ feeds, selectedTab, onSelect }: Props) {
  return (
    <div className="flex gap-2 flex-wrap">
      {feeds.map((feed, i) => (
        <button
          key={feed.label}
          onClick={() => onSelect(i)}
          className={`flex items-center gap-1 text-sm px-3 py-1 rounded-full border transition-colors ${
            i === selectedTab
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {feed.icon}
          <span>{feed.label}</span>
        </button>
      ))}
    </div>
  );
}
