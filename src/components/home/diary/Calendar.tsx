import "react-day-picker/dist/style.css";
import { DayPicker } from "react-day-picker";
import { ko } from "react-day-picker/locale";
import { formatKoreanMonth } from "@/utils/dateFormat";
import Button from "@/components/Button";
import { useDiaryByMonth } from "@/hooks/queries/useDiaryMonth";
import { format } from "date-fns";
import { useAuthStore } from "@/stores/auth.store";

type CalendarProps = {
  selected: Date;
  onSelect: (date: Date) => void;
  month: Date;
  onMonth: (date: Date) => void;
  yearMonth: string;
};

export default function Calendar({
  selected,
  onSelect,
  month,
  onMonth,
  yearMonth,
}: CalendarProps) {
  const user = useAuthStore((state) => state.user);

  const { data } = useDiaryByMonth({
    userId: user?.id ?? "",
    yearMonth,
  });
  const handleToday = () => {
    const today = new Date();
    onSelect(today);
    onMonth(today);
  };
  const diarySet = new Set(data?.map((diary) => diary.diaryDate));
  return (
    <div className="flex-1 bg-white/30 p-6 rounded-2xl shadow-md overflow-x-auto">
      <div className="mx-auto w-fit">
        <div className="flex items-center justify-between">
          <Button onClick={handleToday}>오늘</Button>
          <p className="flex items-center gap-1 text-sm">
            <i className="block w-2 h-2 bg-green-500 rounded-full" /> 일기 있음
          </p>
        </div>
        <DayPicker
          month={month}
          onMonthChange={onMonth}
          required
          showOutsideDays
          mode="single"
          locale={ko}
          selected={selected}
          onSelect={onSelect}
          formatters={{
            formatCaption: (date) => formatKoreanMonth(date),
          }}
          modifiers={{
            hasDiary: (date) => {
              const key = format(date, "yyyy-MM-dd");
              return diarySet.has(key);
            },
          }}
          modifiersClassNames={{
            hasDiary: "has-diary",
          }}
        />
      </div>
    </div>
  );
}
