import { formatKoreanDate } from "../utils/dateFormat";

type DailyDiaryProps = {
  selected: Date;
};
export default function DailyDiary({ selected }: DailyDiaryProps) {
  return (
    <div className="mt-5 md:mt-0 flex-1 bg-white text-black p-6 rounded-2xl shadow-md">
      <h2>{formatKoreanDate(selected)}</h2>
      <ul>
        <li>여기에 해당 날짜 일기 데이터</li>
      </ul>
    </div>
  );
}
