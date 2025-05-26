import {
  Newspaper,
  BookOpen,
  Train,
  Clapperboard,
  Monitor,
  ShoppingBag,
  Globe,
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
    label: "IT",
    icon: <Monitor size={16} />,
    urls: [
      "https://zenn.dev/feed",
      "https://www.publickey1.jp/atom.xml",
      "https://menthas.com/all/rss",
    ],
  },
  {
    label: "本",
    icon: <BookOpen size={16} />,
    urls: [
      "https://www.webdoku.jp/atom.xml",
      "https://dain.cocolog-nifty.com/myblog/atom.xml",
      "https://www.iwanami.co.jp/rss/news/",
    ],
  },
  {
    label: "エンタメ",
    icon: <Clapperboard size={16} />,
    urls: [
      "https://natalie.mu/comic/feed/news/",
      "https://news.denfaminicogamer.jp/feed",
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
    label: "インターネット",
    icon: <Globe size={16} />,
    urls: ["https://b.hatena.ne.jp/hotentry.rss"],
  },
];
