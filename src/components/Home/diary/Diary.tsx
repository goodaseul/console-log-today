import { useState } from "react";
import Calendar from "./Calendar";
import DailyDiary from "./DailyDiary";
import { useDiaryByMonth, useDiaryCount } from "@/hooks/queries";
import { toYearMonth } from "@/utils/dateFormat";
import Info from "./Info";

export default function Diary() {
  const [selected, setSelected] = useState<Date>(new Date());
  const [month, setMonth] = useState(new Date());

  const { data: total } = useDiaryCount();
  const yearMonth = toYearMonth(month);
  const { data: monthly } = useDiaryByMonth(yearMonth);

  return (
    <div>
      <Info monthly={monthly ?? []} total={total ?? 0} />
      <div className="md:flex gap-5 md:gap-5 md:justify-between items-stretch">
        <Calendar
          month={month}
          onMonth={setMonth}
          selected={selected}
          onSelect={setSelected}
        />
        <DailyDiary selected={selected} />
      </div>
    </div>
  );
}
