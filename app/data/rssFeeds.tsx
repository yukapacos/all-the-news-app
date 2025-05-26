import {
  Newspaper,
  BookOpen,
  Train,
  Clapperboard,
  Monitor,
  ShoppingBag,
} from "lucide-react";

import { FeedItem } from "@/types/FeedItem";

export const rssFeeds: FeedItem[] = [
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
    urls: ["https://natalie.mu/comic/feed/news/"],
  },
  {
    label: "IT",
    icon: <Monitor size={16} />,
    urls: ["https://zenn.dev/feed"],
  },
  {
    label: "ショッピング",
    icon: <ShoppingBag size={16} />,
    urls: ["https://k.xpg.jp/feed.xml"],
  },
];
