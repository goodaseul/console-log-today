import { differenceInCalendarDays, subDays } from "date-fns";
import { toDateKey } from "./dateFormat";

export function getStreak(dates: string[]) {
  const set = new Set(dates);
  let streak = 0;
  let current = new Date();

  while (true) {
    const key = toDateKey(current);
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

  const sorted = [...new Set(dates)]
    .map((date) => new Date(date))
    .sort((a, b) => a.getTime() - b.getTime());

  let max = 1;
  let current = 1;

  for (let i = 1; i < sorted.length; i++) {
    const diff = differenceInCalendarDays(sorted[i], sorted[i - 1]);
    if (diff === 1) {
      current++;
      max = Math.max(current, max);
    } else if (diff > 1) {
      current = 1;
    }
  }

  return max;
}
