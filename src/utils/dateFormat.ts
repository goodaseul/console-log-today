import { ko } from "react-day-picker/locale";
import { format } from "date-fns";

export function formatKoreanMonth(date: Date) {
  return format(date, "yyyy년 M월", { locale: ko });
}

export function formatKoreanDate(date: Date) {
  return format(date, "yyyy년 M월 d일 (EEE)", { locale: ko });
}

export function toDateKey(date: Date) {
  return format(date, "yyyy-MM-dd");
}

export function toYearMonth(date: Date) {
  return format(date, "yyyy-MM");
}
