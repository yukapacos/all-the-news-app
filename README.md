# all-the-news-app

シンプルなニュースフィードアプリです。
RSS フィードが好きなので、試しに自作してみました。

## 🌐 デモ

[https://news-feed.yukaten.com/](https://news-feed.yukaten.com/)

![Demo](https://news-feed.yukaten.com/demo.png)

## 🛠 技術スタック

- [Next.js 15 (App Router)](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/icons/)
- [RSS Parser](https://www.npmjs.com/package/rss-parser)

## 🚀 ローカルでの実行

1. リポジトリをクローン:

```bash
git clone https://github.com/yukapacos/all-the-news-app.git
cd all-the-news-app
```

2. 依存関係をインストール:

```bash
npm install
```

3. （任意）天気情報の表示を有効にする:
   app/page.tsx にて、 NEXT_PUBLIC_OPENWEATHER_API_KEY を使って [OpenWeatherMap API](https://openweathermap.org/) から現在の天気情報を取得しています.
   この機能を有効にするには:

- OpenWeatherMap で無料アカウントを作成
- 無料プランに登録
- API キーを取得
- .env.local ファイルを作成して、以下の行を追加:

```bash
NEXT_PUBLIC_OPENWEATHER_API_KEY=(API キー)
```

4. 開発サーバーを起動:

```bash
npm run dev
```

5. ブラウザで http://localhost:3000 にアクセス

6. RSS の取得元は app/data/rssFeeds.tsx を編集してカスタマイズできます:

```
// 例
{
  label: "ニュース",
  icon: <Newspaper size={16} />,
  urls: [
    "https://www.nhk.or.jp/rss/news/cat0.xml",
    "https://example.com/rss.xml",
  ],
}
```

## 📄 ライセンス

MIT
