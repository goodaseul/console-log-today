import "react-day-picker/dist/style.css";
import { DayPicker } from "react-day-picker";
import { ko } from "react-day-picker/locale";
import { formatKoreanMonth } from "../utils/dateFormat";

type CalendarProps = {
  selected: Date;
  onSelect: (date: Date) => void;
  month: Date;
  onMonth: (date: Date) => void;
};

export default function Calendar({
  selected,
  onSelect,
  month,
  onMonth,
}: CalendarProps) {
  const handleToday = () => {
    const today = new Date();
    onSelect(today);
    onMonth(today);
  };
  return (
    <div className="bg-white/30 p-6 rounded-2xl shadow-md overflow-x-auto">
      <div className="mx-auto w-fit">
        <button onClick={handleToday}>오늘로 돌아가기</button>
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
        />
      </div>
    </div>
  );
}
