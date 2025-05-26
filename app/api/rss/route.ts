import { NextRequest } from "next/server";
import Parser, { CustomFieldItem } from "rss-parser";

type CustomFeedItem = {
  title: string;
  link: string;
  pubDate?: string;
  published?: string;
  contentSnippet?: string;
  content?: string;
  "media:thumbnail"?: { url: string };
  "media:description"?: string;
  "yt:videoId"?: string;
  "media:group"?: {
    "media:thumbnail"?: { url: string };
    "media:description"?: string;
    "media:title"?: string;
  };
};

const parser: Parser<unknown, CustomFeedItem> = new Parser({
  customFields: {
    item: [
      "media:thumbnail",
      "media:description",
      "media:group",
      "yt:videoId",
      "content:encoded",
    ] as unknown as CustomFieldItem<CustomFeedItem>[], // FIXME
  },
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return new Response(JSON.stringify({ error: "No URL provided" }), {
      status: 400,
    });
  }

  try {
    const feed = await parser.parseURL(url);

    const items = feed.items.map((item) => {
      const mediaGroup = item["media:group"] ?? {};

      const description = Array.isArray(mediaGroup?.["media:description"])
        ? mediaGroup["media:description"][0]
        : item.contentSnippet || item.content || "";

      const thumbnail = Array.isArray(mediaGroup?.["media:thumbnail"])
        ? mediaGroup["media:thumbnail"][0]?.$?.url || ""
        : "";

      return {
        title: item.title,
        link: item.link,
        pubDate: item.pubDate || item.isoDate || null,
        description,
        thumbnail,
        videoId: item["yt:videoId"] || null,
      };
    });

    return new Response(JSON.stringify(items), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("RSS fetch error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch RSS" }), {
      status: 500,
    });
  }
}
