import { useEffect, useRef, useState } from "react";

export default function DiaryContent({ data }: { data: string }) {
  const [isContentEnd, setIsContentEnd] = useState(false);
  const [hasScroll, setHasScroll] = useState(false);
  const diaryContentRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = diaryContentRef.current;
    if (!el) return;

    const checkScorll = () => {
      const hasScroll = el.scrollHeight > el.clientHeight;
      setHasScroll(hasScroll);
      const isEnd = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      setIsContentEnd(isEnd);
    };
    checkScorll();
    el.addEventListener("scroll", checkScorll);
    window.addEventListener("resize", checkScorll);

    return () => {
      el.removeEventListener("scroll", checkScorll);
      window.removeEventListener("resize", checkScorll);
    };
  }, []);

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
