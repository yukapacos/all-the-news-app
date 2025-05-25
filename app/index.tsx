import NewsTab from "@/components/NewsTab";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <h1 className="text-2xl font-bold text-center py-6">
        わたしのおすすめニュース
      </h1>
      <NewsTab />
    </main>
  );
}
