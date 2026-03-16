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
    <ul className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 my-5">
      <li>
        ✍🏻 이번 달 작성:
        <span className="mx-1 rounded bg-yellow-100 px-2 py-0.5 font-semibold text-yellow-700">
          {monthly.length}
        </span>
        개
      </li>
      <li>
        ➕ 총 작성:
        <span className="mx-1 rounded bg-yellow-100 px-2 py-0.5 font-semibold text-yellow-700">
          {total}
        </span>
        일
      </li>
      <li>
        🗓️ 최근 연속 기록:
        <span className="mx-1 rounded bg-green-100 px-2 py-0.5 font-semibold text-green-700">
          {streak}
        </span>
        일
      </li>
      <li>
        🎯 최대 연속 기록:
        <span className="mx-1 rounded bg-red-100 px-2 py-0.5 font-semibold text-red-700">
          {maxStreak}
        </span>
        일
      </li>
    </ul>
  );
}
