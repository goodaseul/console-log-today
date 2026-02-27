import { useState } from "react";
import Calendar from "./Calendar";
import DailyDiary from "./DailyDiary";

export default function Diary() {
  const [selected, setSelected] = useState<Date>(new Date());
  const [month, setMonth] = useState(new Date());

  return (
    <div className="md:flex gap-5 md:gap-5  md:justify-between">
      <Calendar
        month={month}
        onMonth={setMonth}
        selected={selected}
        onSelect={setSelected}
      />
      <DailyDiary selected={selected} />
    </div>
  );
}
