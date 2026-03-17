import type { Diary } from "@/api/types/diary";
import { getMaxStreak, getStreak } from "@/utils/streak";
import { useMemo } from "react";

export default function Info({
  monthly,
  total,
}: {
  monthly: Diary[];
  total: number;
}) {
  const { streak, maxStreak } = useMemo(() => {
    if (monthly.length === 0) {
      return {
        streak: 0,
        maxStreak: 0,
      };
    }
    const dates = monthly.map((diary) => diary.diaryDate);
    return {
      streak: getStreak(dates),
      maxStreak: getMaxStreak(dates),
    };
  }, [monthly]);

  const items = [
    { label: "이번 달 작성", value: `${monthly.length}개` },
    { label: "총 작성", value: `${total}개` },
    { label: "최근 연속 기록", value: `${streak}일` },
    { label: "최대 연속 기록", value: `${maxStreak}일` },
  ];

  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6 text-sm md:text-base">
      {items.map((item) => (
        <li
          key={item.label}
          className="rounded-xl bg-foreground dark:bg-background text-background dark:text-foreground p-5 text-center shadow-sm"
        >
          <p className="text-xs opacity-60">{item.label}</p>
          <p className="mt-1 text-2xl font-semibold">{item.value}</p>
        </li>
      ))}
    </ul>
  );
}
