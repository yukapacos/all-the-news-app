type Props = {
  showUnreadOnly: boolean;
  onToggleUnreadOnly: () => void;
  filterType: "all" | "articles" | "videos";
  onFilterChange: (value: "all" | "articles" | "videos") => void;
  onClearReadLinks: () => void;
};

export default function Toolbar({
  showUnreadOnly,
  onToggleUnreadOnly,
  filterType,
  onFilterChange,
}: // onClearReadLinks, // 一旦コメントアウト
Props) {
  return (
    <div className="flex flex-wrap items-center justify-between mt-2 gap-4">
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <span className="text-gray-700">未読のみ</span>
          <div
            className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-300 cursor-pointer ${
              showUnreadOnly ? "bg-black" : "bg-gray-300"
            }`}
            onClick={onToggleUnreadOnly}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                showUnreadOnly ? "translate-x-5" : ""
              }`}
            />
          </div>
        </label>
        <div className="flex gap-2">
          {[
            { label: "すべて", value: "all" },
            { label: "記事のみ", value: "articles" },
            { label: "動画のみ", value: "videos" },
          ].map(({ label, value }) => (
            <button
              key={value}
              onClick={() =>
                onFilterChange(value as "all" | "articles" | "videos")
              }
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
      {/* 一旦コメントアウト */}
      {/* <button
        onClick={onClearReadLinks}
        className="text-sm text-red-500 hover:underline"
      >
        既読履歴をリセット
      </button> */}
    </div>
  );
}
