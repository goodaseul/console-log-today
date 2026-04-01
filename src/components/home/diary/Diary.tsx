import { useState } from "react";
import { useDiaryAll, useDiaryCount } from "@/hooks/queries";
import { toYearMonth } from "@/utils/dateFormat";
import Info from "./Info";
import Calendar from "./Calendar";
import DailyDiary from "./DailyDiary";
import Search from "./Search";

export default function Diary() {
  const today = new Date();
  const [selected, setSelected] = useState<Date>(today);
  const [month, setMonth] = useState(today);
  const { data: total } = useDiaryCount();
  const { data: allDate } = useDiaryAll();

  const yearMonth = toYearMonth(month);
  const everyDate = allDate?.map((date) => date.diary_date);
  const monthly = everyDate?.filter((date) => date.startsWith(yearMonth)) ?? [];
  const handleSelect = (date: Date) => {
    setSelected(date);
    setMonth(date);
  };

  return (
    <div>
      <Search onSelect={handleSelect} />

      <Info monthly={monthly} allDate={everyDate ?? []} total={total ?? 0} />
      <div
        className="flex 
        flex-col-reverse
        md:flex-row
        gap-5 md:gap-5 
        md:justify-between 
        items-stretch"
      >
        <Calendar
          month={month}
          onMonth={setMonth}
          selected={selected}
          onSelect={handleSelect}
          allDate={everyDate ?? []}
        />
        <DailyDiary selected={selected} />
      </div>
    </div>
  );
}
