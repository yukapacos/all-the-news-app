# all-the-news-app

A simple news feed app.  
I built this out of curiosity because I really enjoy reading RSS feeds.

## 🌐 Demo

[https://news-feed.yukaten.com/](https://news-feed.yukaten.com/)

![Demo](https://news-feed.yukaten.com/demo.png)

## 🛠 Tech Stack

- [Next.js 15 (App Router)](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/icons/)
- [RSS Parser](https://www.npmjs.com/package/rss-parser)

## 🚀 How to Run Locally

1. Clone the repository:

```bash
git clone https://github.com/yukapacos/all-the-news-app.git
cd all-the-news-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and go to http://localhost:3000

5. You can customize the RSS sources by editing app/data/rssFeeds.tsx.

```
// Example
{
  label: "News",
  icon: <Newspaper size={16} />,
  urls: [
    "https://www.nhk.or.jp/rss/news/cat0.xml",
    "https://example.com/rss.xml",
  ],
}
```

6.

## 📄 License

MIT
