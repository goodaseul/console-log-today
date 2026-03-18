import { useState } from "react";
import { useDiaryByMonth, useDiaryCount } from "@/hooks/queries";
import { toYearMonth } from "@/utils/dateFormat";
import Info from "./Info";
import Calendar from "./Calendar";
import DailyDiary from "./DailyDiary";
import { useAuthStore } from "@/stores/auth.store";

export default function Diary() {
  const user = useAuthStore((state) => state.user);
  const today = new Date();
  const [selected, setSelected] = useState<Date>(today);
  const [month, setMonth] = useState(today);

  const { data: total } = useDiaryCount();
  const yearMonth = toYearMonth(month);
  const { data: monthly } = useDiaryByMonth({
    userId: user?.id ?? "",
    yearMonth,
  });

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
