import { getMaxStreak, getStreak } from "@/utils/streak";

export default function Info({
  monthly,
  total,
  allDate,
}: {
  monthly: string[];
  total: number;
  allDate: string[];
}) {
  const streak = getStreak(allDate);
  const maxStreak = getMaxStreak(allDate);
  const items = [
    { label: "이번 달 작성", value: `${monthly.length}개` },
    { label: "총 작성", value: `${total}개` },
    { label: "최근 연속 기록", value: `${streak}일` },
    { label: "최대 연속 기록", value: `${maxStreak}일` },
  ];

  return (
    <ul className="grid grid-cols-4 gap-2 md:gap-4 my-2 sm:my-4 md:my-6 text-xs md:text-sm">
      {items.map((item) => (
        <li
          key={item.label}
          className="
            rounded-lg md:rounded-xl
            bg-foreground dark:bg-background
            text-background dark:text-foreground
            py-3 px-0 md:p-5
            text-center shadow-sm
            "
        >
          <p className="opacity-60">{item.label}</p>
          <p className="mt-1 font-semibold text-sm md:text-md">{item.value}</p>
        </li>
      ))}
    </ul>
  );
}
