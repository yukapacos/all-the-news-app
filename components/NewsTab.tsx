"use client";

import { ReactElement, useEffect, useState } from "react";
import {
  Inbox,
  Newspaper,
  BookOpen,
  Train,
  Clapperboard,
  Monitor,
} from "lucide-react";
import VideoCard from "./VideoCard";

const rssFeeds: FeedItem[] = [
  {
    label: "ニュース",
    icon: <Newspaper size={16} />,
    urls: [
      "https://www.nhk.or.jp/rss/news/cat0.xml",
      "https://www.youtube.com/feeds/videos.xml?channel_id=UCGCZAYq5Xxojl_tSXcVJhiQ",
    ],
  },
  {
    label: "本",
    icon: <BookOpen size={16} />,
    urls: [
      "https://www.webdoku.jp/atom.xml",
      "https://dain.cocolog-nifty.com/myblog/atom.xml",
      "https://www.youtube.com/feeds/videos.xml?channel_id=UCmKlo3BXt60nzgk2r_JgvwQ",
    ],
  },
  {
    label: "乗りもの",
    icon: <Train size={16} />,
    urls: [
      "https://assets.wor.jp/rss/rdf/trafficnews/top.rdf",
      "https://www.youtube.com/feeds/videos.xml?channel_id=UCXJ7UIYKcWnikgfGEHs3SRA",
    ],
  },
  {
    label: "エンタメ",
    icon: <Clapperboard size={16} />,
    url: "https://natalie.mu/comic/feed/news/",
  },
  {
    label: "IT",
    icon: <Monitor size={16} />,
    url: "https://zenn.dev/feed",
  },
  {
    label: "動画",
    icon: <Monitor size={16} />,
    url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCyHdFYJyt4Ihwuscuk5ALJA",
  },
];

type FeedItem =
  | { label: string; url: string; icon: ReactElement }
  | { label: string; urls: string[]; icon: ReactElement };

export default function NewsPage() {
  const [tab, setTab] = useState(0);
  // FIXME
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [items, setItems] = useState<any[]>([]);
  const [readLinks, setReadLinks] = useState<Set<string>>(new Set());
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [filterType, setFilterType] = useState<"all" | "articles" | "videos">(
    "all"
  );

  useEffect(() => {
    const stored = localStorage.getItem("showUnreadOnly");
    if (stored !== null) {
      setShowUnreadOnly(stored === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("showUnreadOnly", showUnreadOnly.toString());
  }, [showUnreadOnly]);

  // 既読リンクをlocalStorageから初期化
  useEffect(() => {
    const stored = localStorage.getItem("readLinks");
    if (stored) {
      setReadLinks(new Set(JSON.parse(stored)));
    }
  }, []);

  useEffect(() => {
    const fetchRSS = async () => {
      const feed = rssFeeds[tab];
      if ("urls" in feed) {
        const results = await Promise.all(
          feed.urls.map((url) =>
            fetch(`/api/rss?url=${encodeURIComponent(url)}`).then((res) =>
              res.json()
            )
          )
        );
        const merged = results.flat().sort((a, b) => {
          return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
        });
        setItems(merged);
      } else {
        const res = await fetch(`/api/rss?url=${encodeURIComponent(feed.url)}`);
        const data = await res.json();
        console.log("debug result", data);
        setItems(data);
      }
    };
    fetchRSS();
  }, [tab]);

  const markAsRead = (link: string) => {
    console.log("debug link", link);
    const updated = new Set(readLinks);
    updated.add(link);
    setReadLinks(updated);
    localStorage.setItem("readLinks", JSON.stringify([...updated]));
  };

  const clearReadLinks = () => {
    setReadLinks(new Set());
    localStorage.removeItem("readLinks");
  };

  // TODO: remove
  // FIXME
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const extractImageUrl = (item: any): string | null => {
    console.log("debug item", item);

    // media:group にネストされているケース (YouTube)
    const mediaGroup = item["media:group"];
    if (mediaGroup) {
      if (mediaGroup["media:thumbnail"]?.[0]?.url) {
        return mediaGroup["media:thumbnail"][0].url;
      }
      if (mediaGroup["media:content"]?.[0]?.url) {
        return mediaGroup["media:content"][0].url;
      }
    }

    // フラットな構造のケース
    if (item["media:thumbnail"]?.url) return item["media:thumbnail"].url;
    if (item["media:content"]?.url) return item["media:content"].url;
    if (item.enclosure?.url) return item.enclosure.url;

    // TODO: use this
    // HTML内のimgタグから抽出
    const match = item.content?.match(/<img[^>]+src="([^">]+)"/);
    return match?.[1] || null;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "日時不明";
    }
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };

  const visibleItems = items.filter((item) => {
    const isUnread = !readLinks.has(item.link);
    const isVideo = !!item.videoId;

    if (showUnreadOnly && !isUnread) return false;
    if (filterType === "videos" && !isVideo) return false;
    if (filterType === "articles" && isVideo) return false;

    return true;
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
      <div className="flex gap-2 flex-wrap">
        {rssFeeds.map((feed, i) => (
          <button
            key={feed.label}
            onClick={() => setTab(i)}
            className={`flex items-center gap-1 text-sm px-3 py-1 rounded-full border transition-colors ${
              i === tab
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {feed.icon}
            <span>{feed.label}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between mt-2 gap-4">
        <div className="flex items-center gap-4">
          {/* 未読のみ表示トグル */}
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <span className="text-gray-700">未読のみ</span>
            <div
              className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-300 cursor-pointer ${
                showUnreadOnly ? "bg-black" : "bg-gray-300"
              }`}
              onClick={() => setShowUnreadOnly((prev) => !prev)}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                  showUnreadOnly ? "translate-x-5" : ""
                }`}
              />
            </div>
          </label>

          {/* フィルター切り替えボタン */}
          <div className="flex gap-2">
            {[
              { label: "すべて", value: "all" },
              { label: "記事のみ", value: "articles" },
              { label: "動画のみ", value: "videos" },
            ].map(({ label, value }) => (
              <button
                key={value}
                // FIXME
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onClick={() => setFilterType(value as any)}
                className={`px-2 py-1 rounded text-xs border ${
                  filterType === value
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 既読リセット */}
        <button
          onClick={clearReadLinks}
          className="text-sm text-red-500 hover:underline"
        >
          既読履歴をリセット
        </button>
      </div>

      <ul className="space-y-4">
        {visibleItems.length === 0 ? (
          <div className="text-center text-gray-500 text-sm mt-8 flex flex-col items-center gap-2">
            <Inbox className="w-8 h-8 text-gray-400" />
            <p>
              {showUnreadOnly
                ? "未読の記事はありません。"
                : "記事が見つかりませんでした。"}
            </p>
          </div>
        ) : (
          visibleItems.map((item, i) => {
            const imageUrl = item.thumbnail;
            const isRead = readLinks.has(item.link);
            const videoId = item.videoId;

            return (
              <li key={i} className="flex flex-col gap-2 border-b pb-4">
                {/* YouTube埋め込み */}
                {videoId ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => markAsRead(item.link)}
                    className="block"
                  >
                    <VideoCard
                      videoId={item.videoId}
                      title={item.title}
                      description={item.description}
                      pubDate={item.pubDate}
                      isRead={readLinks.has(item.link)} // ← ここで既読判定を渡す
                    />
                  </a>
                ) : (
                  // サムネイル付き表示（通常記事）
                  <div className="flex items-start gap-3">
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt=""
                        className="w-20 h-14 object-cover rounded border"
                      />
                    )}
                    <div className="flex-1">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => markAsRead(item.link)}
                        className={`block text-sm font-semibold hover:underline ${
                          isRead
                            ? "text-gray-400 line-through"
                            : "text-gray-800"
                        }`}
                      >
                        {item.title}
                      </a>
                      <p className="text-xs text-gray-500">
                        {formatDate(item.pubDate)}
                      </p>
                      {item.description && (
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
