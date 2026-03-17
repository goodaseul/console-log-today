import { ko } from "react-day-picker/locale";
import { format } from "date-fns";

export function formatDate(date: Date, pattern: string) {
  return format(date, pattern, { locale: ko });
}

export function formatKoreanMonth(date: Date) {
  return formatDate(date, "yyyy년 M월");
}

export function formatKoreanDate(date: Date) {
  return formatDate(date, "yyyy년 M월 d일 (EEE)");
}

export function toDateKey(date: Date) {
  return formatDate(date, "yyyy-MM-dd");
}

export function toYearMonth(date: Date) {
  return formatDate(date, "yyyy-MM");
}
