import "react-day-picker/dist/style.css";
import { DayPicker } from "react-day-picker";
import { ko } from "react-day-picker/locale";
import { formatKoreanMonth } from "@/utils/dateFormat";
import Button from "@/components/Button";
import { format } from "date-fns";

type CalendarProps = {
  selected: Date;
  onSelect: (date: Date) => void;
  month: Date;
  onMonth: (date: Date) => void;
  allDate: string[];
};

export default function Calendar({
  selected,
  onSelect,
  month,
  onMonth,
  allDate,
}: CalendarProps) {
  const handleToday = () => {
    const today = new Date();
    onSelect(today);
    onMonth(today);
  };
  const diarySet = new Set(allDate);

  return (
    <div className="flex-1  p-4 sm:p-6 rounded-2xl shadow-md overflow-x-auto">
      <div className="mx-auto w-fit">
        <div className="flex items-center justify-between">
          <Button onClick={handleToday}>오늘</Button>
          <p className="flex items-center gap-1.5 text-sm">
            <i className="block w-1.5 h-1.5 bg-point rounded-full" /> 일기 있음
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
            today: "bg-transparnet font-bold",
          }}
        />
      </div>
    </div>
  );
}
