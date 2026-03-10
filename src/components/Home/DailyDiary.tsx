import { useCreateDiary, useDiaryByDate } from "@/hooks/queries";
import { formatKoreanDate, toDateKey } from "../../utils/dateFormat";
import Button from "../Button";
import DiaryContent from "./DiaryContent";
import Tag from "./Tag";
import { useEffect, useState } from "react";
import type { Mode } from "@/types/diaryType";
import { useAuthStore } from "@/stores/auth.store";
import { toast } from "sonner";

type DailyDiaryProps = {
  selected: Date;
};

export default function DailyDiary({ selected }: DailyDiaryProps) {
  const user = useAuthStore((state) => state.user);
  const dateKey = toDateKey(selected);
  const { data, isLoading, isError } = useDiaryByDate(dateKey);
  const [mode, setMode] = useState<Mode>("view");
  const [diary, setDiary] = useState("");

  const { mutate } = useCreateDiary();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMode("view");
  }, [selected]);

  const handleCreateDiary = () => {
    if (!diary.trim()) return toast.success("일기를 추가해주세요.");
    mutate({
      userId: user?.id,
      content: diary,
      diaryDate: dateKey,
    });

    setDiary("");
    setMode("view");
    toast.success("일기가 추가됐습니다.");
  };

  const handleRejectDiary = () => {
    setMode("view");
  };
  return (
    <div className="mt-5 md:mt-0 flex-1 bg-white text-black p-6 rounded-2xl shadow-md">
      <div className="flex items-center justify-end gap-2">
        {data?.content ? (
          <>
            <Button onClick={() => setMode("edit")}>일기 수정</Button>
            <Button onClick={() => console.log("삭제")} variant="light">
              일기 삭제
            </Button>
          </>
        ) : mode === "view" ? (
          <>
            <Button onClick={() => setMode("create")}>일기 작성</Button>
            <Button onClick={() => console.log("삭제")} variant="light">
              일기 삭제
            </Button>
          </>
        ) : (
          <>
            <Button variant="light" onClick={handleCreateDiary}>
              일기 추가
            </Button>
            <Button onClick={handleRejectDiary}>작성 취소</Button>
          </>
        )}
      </div>
      <div className="mt-5 mb-2 flex items-center justify-between">
        <small className="block">{formatKoreanDate(selected)}</small>
        <Tag />
      </div>
      {isLoading && <p>로딩 중..</p>}
      {isError && <p>에러 입니다. </p>}
      {!isLoading && !isError && (
        <DiaryContent
          data={data?.content}
          mode={mode}
          content={diary}
          setContent={setDiary}
        />
      )}
    </div>
  );
}
