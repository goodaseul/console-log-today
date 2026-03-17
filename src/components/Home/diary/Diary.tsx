import { useMemo, useState } from "react";
import Calendar from "./Calendar";
import DailyDiary from "./DailyDiary";
import { useDiaryByMonth, useDiaryCount } from "@/hooks/queries";
import { toYearMonth } from "@/utils/dateFormat";
import Info from "./Info";

export default function Diary() {
  const today = new Date();
  const [selected, setSelected] = useState<Date>(today);
  const [month, setMonth] = useState(today);

  const { data: total } = useDiaryCount();
  const yearMonth = useMemo(() => toYearMonth(month), [month]);
  const { data: monthly } = useDiaryByMonth(yearMonth);

  const handleSelect = (date: Date) => {
    setSelected(date);
    setMonth(date);
  };

  return (
    <div>
      <Info monthly={monthly ?? []} total={total ?? 0} />
      <div className="md:flex gap-5 md:gap-5 md:justify-between items-stretch">
        <Calendar
          month={month}
          onMonth={setMonth}
          selected={selected}
          onSelect={handleSelect}
          yearMonth={yearMonth}
        />
        <DailyDiary selected={selected} />
      </div>
    </div>
  );
}
