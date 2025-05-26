export const formatDate = (dateString?: string): string => {
  if (!dateString) return "日時不明";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "日時不明";

  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};
