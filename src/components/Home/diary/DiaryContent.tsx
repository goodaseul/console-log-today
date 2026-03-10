import { useEffect, useRef, useState } from "react";

type Props = {
  mode: "view" | "edit" | "create";
  data?: string;
  content: string;
  setContent: (v: string) => void;
};

export default function DiaryContent({
  mode,
  data,
  content,
  setContent,
}: Props) {
  const diaryContentRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [hasScroll, setHasScroll] = useState(false);
  const [isContentEnd, setIsContentEnd] = useState(false);

  const checkScroll = () => {
    const el = diaryContentRef.current;
    if (!el) return;

    const scrollable = el.scrollHeight > el.clientHeight;
    setHasScroll(scrollable);

    const isEnd = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
    setIsContentEnd(isEnd);
  };

  useEffect(() => {
    if (mode === "edit") {
      const el = textareaRef.current;
      if (!el) return;
      el.focus();
      const len = el.value.length;
      el.setSelectionRange(len, len);
    }
  }, [mode]);
  useEffect(() => {
    checkScroll();
  }, [data]);

  if (mode === "edit" || mode === "create") {
    return (
      <div className="relative h-full">
        <textarea
          placeholder="일기를 작성해주세요."
          autoFocus
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-full resize-none p-5 focus-visible:outline-none bg-transparent"
          ref={textareaRef}
        />
        <span className="absolute -top-6.5 right-5 text-sm text-gray-500">
          {content.length}
        </span>
      </div>
    );
  }

  return (
    <div
      ref={diaryContentRef}
      onScroll={checkScroll}
      className={`
        relative
        whitespace-pre-line break-keep
        overflow-y-auto
        h-full
        p-5
        ${
          hasScroll &&
          !isContentEnd &&
          "mask-[linear-gradient(to_bottom,black_80%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]"
        }
      `}
    >
      {data ?? "일기가 없습니다."}
    </div>
  );
}
