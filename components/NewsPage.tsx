"use client";

import { useEffect, useState } from "react";
import { Inbox, Loader2 } from "lucide-react";
import VideoCard from "./VideoCard";
import Toolbar from "./Toolbar";
import FeedTabs from "./FeedTabs";
import { rssFeeds } from "@/app/data/rssFeeds";
import { formatDate } from "@/app/util/formatDate";

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
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      try {
        const feed = rssFeeds[tab];
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
      } finally {
        setIsLoading(false);
      }
    };
    fetchRSS();
  }, [tab]);

  const openLink = (link: string) => {
    markAsRead(link);

    window.open(link, "_blank", "noopener,noreferrer");
  };

  const markAsRead = (link: string) => {
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
  // const extractImageUrl = (item: any): string | null => {

  //   // media:group にネストされているケース (YouTube)
  //   const mediaGroup = item["media:group"];
  //   if (mediaGroup) {
  //     if (mediaGroup["media:thumbnail"]?.[0]?.url) {
  //       return mediaGroup["media:thumbnail"][0].url;
  //     }
  //     if (mediaGroup["media:content"]?.[0]?.url) {
  //       return mediaGroup["media:content"][0].url;
  //     }
  //   }

  //   // フラットな構造のケース
  //   if (item["media:thumbnail"]?.url) return item["media:thumbnail"].url;
  //   if (item["media:content"]?.url) return item["media:content"].url;
  //   if (item.enclosure?.url) return item.enclosure.url;

  //   // TODO: use this
  //   // HTML内のimgタグから抽出
  //   const match = item.content?.match(/<img[^>]+src="([^">]+)"/);
  //   return match?.[1] || null;
  // };

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
      <FeedTabs
        feeds={rssFeeds}
        selectedTab={tab}
        onSelect={(i) => setTab(i)}
      />
      <Toolbar
        showUnreadOnly={showUnreadOnly}
        onToggleUnreadOnly={() => setShowUnreadOnly((prev) => !prev)}
        filterType={filterType}
        onFilterChange={(val) => setFilterType(val)}
        onClearReadLinks={clearReadLinks}
      />
      <ul className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin w-4 h-4 text-gray-500" />
          </div>
        ) : visibleItems.length === 0 ? (
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
                {videoId ? (
                  <a
                    href={item.link}
                    onClick={(e) => {
                      e.preventDefault(); // デフォルトの遷移を止める
                      openLink(item.link); // 既読処理内で window.open 実行
                    }}
                    className="block"
                  >
                    <VideoCard
                      videoId={videoId}
                      title={item.title}
                      description={item.description}
                      pubDate={item.pubDate}
                      isRead={isRead}
                    />
                  </a>
                ) : (
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
                        onClick={(e) => {
                          e.preventDefault(); // デフォルトの遷移を止める
                          openLink(item.link); // 既読処理内で window.open 実行
                        }}
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
                {!isRead && (
                  <button
                    onClick={() => markAsRead(item.link)}
                    className="self-end text-xs text-black hover:underline"
                  >
                    既読にする
                  </button>
                )}
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
