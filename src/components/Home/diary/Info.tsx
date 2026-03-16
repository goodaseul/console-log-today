import type { Diary } from "@/api/types/diary";
import { getMaxStreak, getStreak } from "@/utils/streak";

export default function Info({
  monthly,
  total,
}: {
  monthly: Diary[];
  total: number;
}) {
  const dates = monthly.map((date) => date.diaryDate);
  const streak = getStreak(dates);
  const maxStreak = getMaxStreak(dates);

  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6 text-sm md:text-base">
      <li className="rounded-xl bg-foreground dark:bg-background text-background dark:text-foreground p-5 text-center shadow-sm">
        <p className="text-xs opacity-60">이번 달 작성</p>
        <p className="mt-1 text-2xl font-semibold">{monthly.length}개</p>
      </li>

      <li className="rounded-xl bg-foreground dark:bg-background text-background dark:text-foreground p-5 text-center shadow-sm">
        <p className="text-xs opacity-60">총 작성</p>
        <p className="mt-1 text-2xl font-semibold">{total}개</p>
      </li>

      <li className="rounded-xl bg-foreground dark:bg-background text-background dark:text-foreground p-5 text-center shadow-sm">
        <p className="text-xs opacity-60">최근 연속 기록</p>
        <p className="mt-1 text-2xl font-semibold">{streak}일</p>
      </li>

      <li className="rounded-xl bg-foreground dark:bg-background text-background dark:text-foreground p-5 text-center shadow-sm">
        <p className="text-xs opacity-60">최대 연속 기록</p>
        <p className="mt-1 text-2xl font-semibold">{maxStreak}일</p>
      </li>
    </ul>
  );
}
