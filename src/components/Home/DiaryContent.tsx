import type { Mode } from "@/types/diaryType";
import { useEffect, useRef, useState } from "react";

export default function DiaryContent({
  data,
  mode,
  content,
  setContent,
}: {
  data?: string;
  mode: Mode;
  content: string;
  setContent: (content: string) => void;
}) {
  const [isContentEnd, setIsContentEnd] = useState(false);
  const [hasScroll, setHasScroll] = useState(false);

  const diaryContentRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = diaryContentRef.current;
    if (!el) return;

    const checkScroll = () => {
      const hasScroll = el.scrollHeight > el.clientHeight;
      setHasScroll(hasScroll);

      const isEnd = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      setIsContentEnd(isEnd);
    };

    checkScroll();
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  if (mode === "create" || mode === "edit") {
    return (
      <div className="relative">
        <textarea
          placeholder="일기를 작성해주세요."
          autoFocus
          value={content}
          className="w-full h-80 resize-none p-5 focus-visible:outline-none"
          onChange={(e) => setContent(e.target.value)}
        />
        <span className="absolute bottom-2.5 right-2.5 text-sm text-grap-500">
          {content.length}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`
        relative
        whitespace-pre-line break-keep
        overflow-y-auto max-h-68
        transition-all
        ${
          !isContentEnd &&
          hasScroll &&
          "mask-[linear-gradient(to_bottom,black_80%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]"
        }
      `}
      ref={diaryContentRef}
    >
      {data ?? "일기가 없습니다."}
    </div>
  );
}
