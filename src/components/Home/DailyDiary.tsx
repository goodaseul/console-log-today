import { useDiaryByDate } from "@/hooks/queries";
import { formatKoreanDate, toDateKey } from "../../utils/dateFormat";
import Button from "../Button";
import DiaryContent from "./DiaryContent";
import Tag from "./Tag";

type DailyDiaryProps = {
  selected: Date;
};
export default function DailyDiary({ selected }: DailyDiaryProps) {
  const dateKey = toDateKey(selected);
  const { data, isLoading, isError } = useDiaryByDate(dateKey);
  return (
    <div className="mt-5 md:mt-0 flex-1 bg-white text-black p-6 rounded-2xl shadow-md">
      {data?.content ? (
        <div className="flex items-center gap-2">
          <Button onClick={() => console.log("일기 수정")}>일기 수정</Button>
          <Button variant="light" onClick={() => console.log("일기 삭제")}>
            일기 삭제
          </Button>
        </div>
      ) : (
        <Button onClick={() => console.log("일기 추가")}>일기 추가</Button>
      )}
      <div className="mt-5 mb-2 flex items-center justify-between">
        <small className="block">{formatKoreanDate(selected)}</small>
        <Tag />
      </div>
      {isLoading && <p>로딩 중..</p>}
      {isError && <p>에러 입니다. </p>}
      {!isLoading && !isError && <DiaryContent data={data?.content} />}
    </div>
  );
}
