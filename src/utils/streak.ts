import { differenceInCalendarDays, format, subDays } from "date-fns";

export function getStreak(data: string[]) {
  const set = new Set(data);

  let streak = 0;
  let current = subDays(new Date(), 1);
  while (true) {
    const key = format(current, "yyyy-MM-dd");
    if (set.has(key)) {
      streak++;
      current = subDays(current, 1);
    } else {
      break;
    }
  }

  return streak;
}

export function getMaxStreak(dates: string[]) {
  if (!dates.length) return 0;

  const sorted = dates
    .map((date) => new Date(date))
    .sort((a, b) => a.getTime() - b.getTime());

  let max = 1;
  let current = 1;
  for (let i = 1; i < sorted.length; i++) {
    const diff = differenceInCalendarDays(sorted[i], sorted[i - 1]);
    if (diff === 1) {
      current++;
      max = Math.max(max, current);
    } else if (diff > 1) {
      current = 1;
    }
  }
  return max;
}
