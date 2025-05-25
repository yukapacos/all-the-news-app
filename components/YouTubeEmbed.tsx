type Props = {
  videoId: string;
  title?: string;
};

export default function YouTubeEmbed({
  videoId,
  title = "YouTube video",
}: Props) {
  if (!videoId) return null;

  return (
    <div className="w-full aspect-video">
      <iframe
        className="w-full h-full rounded-xl shadow"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
