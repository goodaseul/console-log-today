"use client";

import { useDiarySearch } from "@/hooks/queries/useDiarySearch";
import { formatKoreanDate } from "@/utils/dateFormat";
import { useEffect, useState } from "react";

export default function Search({
  onSelect,
}: {
  onSelect: (date: Date) => void;
}) {
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [open, setOpen] = useState(false);

  const { data: searchDiary = [], isLoading } = useDiarySearch(debounced);
  useEffect(() => {
    const typing = setTimeout(() => {
      setDebounced(search);
    }, 300);

    return () => clearTimeout(typing);
  }, [search]);

  function getPreview(content: string, keyword: string) {
    const index = content.toLowerCase().indexOf(keyword.toLowerCase());
    const start = Math.max(0, index - 10);
    const end = Math.min(content.length, index + keyword.length + 30);

    const preview = content.slice(start, end);
    const prefix = start > 0 ? "..." : "";
    const suffix = end < content.length ? "..." : "";
    return prefix + preview + suffix;
  }

  function highlightKeyword(text: string, keyword: string) {
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = text.split(new RegExp(`(${escaped})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === keyword.toLowerCase() ? (
            <mark key={i} className="bg-point text-white">
              {part}
            </mark>
          ) : (
            part
          ),
        )}
      </>
    );
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setOpen(true);
        }}
        onFocus={() => search && setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder="일기 내용을 검색하세요."
        className="w-full h-10 px-3 rounded-lg border border-gray-300"
      />

      {open && search && (
        <div
          className="absolute left-0 top-full w-full bg-background text-foreground border rounded-b-lg shadow-md z-10
            max-h-80 overflow-y-scroll
        "
        >
          {isLoading ? (
            <div className="p-3 text-sm text-gray-400">불러오는 중...</div>
          ) : searchDiary.length > 0 ? (
            searchDiary.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelect(new Date(item.diary_date));
                  setSearch("");
                }}
                className="block p-3 hover:bg-foreground text-foreground hover:text-background transition-all"
              >
                <div className="text-xs text-gray-400">
                  {formatKoreanDate(item.diary_date)}
                </div>
                <div className="text-sm truncate">
                  {highlightKeyword(
                    getPreview(item.content, debounced),
                    debounced,
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-3 text-sm text-gray-400">검색 결과 없음</div>
          )}
        </div>
      )}
    </div>
  );
}
