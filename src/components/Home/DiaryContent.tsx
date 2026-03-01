import { useEffect, useRef, useState } from "react";

export default function DiaryContent() {
  const [isContentEnd, setIsContentEnd] = useState(false);
  const diaryContentRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = diaryContentRef.current;
    if (!el) return;

    const handleScroll = () => {
      const isEnd = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      setIsContentEnd(isEnd);
    };
    handleScroll();
    el.addEventListener("scroll", handleScroll);

    return () => {
      el.removeEventListener("scroll", handleScroll);
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
          "mask-[linear-gradient(to_bottom,black_80%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]"
        }
      `}
      ref={diaryContentRef}
    >
      오늘도 공부를 해야하다니!!!! 으악 취준은 힘들어잉 오늘은 젤리2개를 샀는데,
      저녁까지 먹으니까 배가 안고프다...? 머징 요새 알고리즘 공부중인데, 많이
      많이 어렵당 ^^ 생각보다 콘텐츠에 많이 써야하네 ;; 아몰랑 반복이댯! 오늘도
      공부를 해야하다니!!!! 으악 취준은 힘들어잉 오늘은 젤리2개를 샀는데,
      저녁까지 먹으니까 배가 안고프다...? 머징 요새 알고리즘 공부중인데, 많이
      많이 어렵당 ^^ 생각보다 콘텐츠에 많이 써야하네 ;; 아몰랑 반복이댯! 오늘도
      공부를 해야하다니!!!! 으악 취준은 힘들어잉 오늘은 젤리2개를 샀는데,
      저녁까지 먹으니까 배가 안고프다...? 머징 요새 알고리즘 공부중인데, 많이
      많이 어렵당 ^^ 생각보다 콘텐츠에 많이 써야하네 ;; 아몰랑 반복이댯!
    </div>
  );
}
