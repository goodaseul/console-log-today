import { useCreateDiary, useDiaryByDate } from "@/hooks/queries";
import { formatKoreanDate, toDateKey } from "../../../utils/dateFormat";
import { useEffect, useState } from "react";
import type { Mode } from "@/types/diaryType";
import { useAuthStore } from "@/stores/auth.store";
import { toast } from "sonner";
import { useUpdateDiary } from "@/hooks/queries/useUpdateDiary";
import { useDeleteDiary } from "@/hooks/queries/useDeleteDiary";
import DailyActionsButtons from "./DailyActionsButtons";
import DiaryContent from "./DiaryContent";

type DailyDiaryProps = {
  selected: Date;
};

export default function DailyDiary({ selected }: DailyDiaryProps) {
  const { mutate: updateMutate } = useUpdateDiary();
  const { mutate: deleteMutate } = useDeleteDiary();
  const user = useAuthStore((state) => state.user);
  const dateKey = toDateKey(selected);
  const { data, isLoading, isError } = useDiaryByDate(dateKey);
  const [mode, setMode] = useState<Mode>("view");
  const [diary, setDiary] = useState("");

  const { mutate: createMutate } = useCreateDiary();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMode("view");
  }, [selected]);

  const handleCreateDiary = () => {
    if (!diary.trim()) {
      toast.error("내용을 입력하세요.");
      return;
    }
    createMutate({
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
  const handleModifyDiary = () => {
    setMode("edit");
    setDiary(data?.content ?? "");
  };
  const handleUpdateDiary = () => {
    if (!diary.trim()) return toast.error("수정할 내용을 적어주세요.");
    updateMutate({
      userId: user?.id,
      diaryDate: dateKey,
      content: diary,
    });
    setMode("view");
    toast.success("일기가 수정됐습니다.");
  };
  const handleDeleteDiary = () => {
    const ok = confirm("정말 삭제하시겠습니까?");
    if (!ok) return;

    deleteMutate(dateKey);
    toast.success("일기가 삭제됐습니다.");
  };
  return (
    <div className="mt-5 md:mt-0 flex-1 bg-white text-black p-6 rounded-2xl shadow-md">
      <div className="flex items-center justify-between">
        <small>일기는 날짜당 하나만 가능합니다.</small>
        <DailyActionsButtons
          onModify={handleModifyDiary}
          onUpdate={handleUpdateDiary}
          onCreate={handleCreateDiary}
          onReject={handleRejectDiary}
          onDelete={handleDeleteDiary}
          setMode={setMode}
          mode={mode}
          data={data?.content}
        />
      </div>

      <div className="mt-5 mb-2 flex items-center justify-between">
        <small className="block">{formatKoreanDate(selected)}</small>
      </div>
      <div className="h-75 relative">
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
    </div>
  );
}
