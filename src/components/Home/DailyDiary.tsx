import { formatKoreanDate } from "../../utils/dateFormat";
import Button from "../Button";
import DiaryContent from "./DiaryContent";
import Tag from "./Tag";

type DailyDiaryProps = {
  selected: Date;
};
export default function DailyDiary({ selected }: DailyDiaryProps) {
  return (
    <div className="mt-5 md:mt-0 flex-1 bg-white text-black p-6 rounded-2xl shadow-md">
      <Button onClick={() => console.log("일기 추가")}>+ 일기</Button>
      <div className="mt-5 mb-2 flex items-center justify-between">
        <small className="block">{formatKoreanDate(selected)}</small>
        <Tag />
      </div>
      <DiaryContent />
    </div>
  );
}
