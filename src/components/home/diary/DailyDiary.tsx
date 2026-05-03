import { useCreateDiary, useDiary } from "@/hooks/queries";
import { formatKoreanDate, toDateKey } from "../../../utils/dateFormat";
import { useEffect, useState } from "react";
import type { Mode } from "@/types/diaryType";
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
  const { mutate: createMutate } = useCreateDiary();
  const dateKey = toDateKey(selected);
  const { data, isLoading, isError } = useDiary({
    diary_date: dateKey,
  });
  const [mode, setMode] = useState<Mode>("view");
  const [diary, setDiary] = useState("");

  const handleChange = (value: string) => {
    setDiary(value);
    localStorage.setItem(`draft-${dateKey}`, value);
  };

  useEffect(() => {
    const draft = localStorage.getItem(`draft-${dateKey}`);

    if (draft) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDiary(draft);
      setMode("draft");

      return;
    }
    if (data?.content) {
      setDiary(data.content);
      setMode("view");
    } else {
      setDiary("");
      setMode("view");
    }
  }, [selected, data]);

  const handleCreateDiary = () => {
    if (!diary.trim()) {
      toast.error("내용을 입력하세요.");
      return;
    }
    createMutate(
      {
        content: diary,
        diary_date: dateKey,
      },
      {
        onSuccess: () => {
          localStorage.removeItem(`draft-${dateKey}`);
          setMode("view");
          toast.success("일기가 추가됐습니다.");
        },
      },
    );
  };
  const handleRejectDiary = () => {
    localStorage.removeItem(`draft-${dateKey}`);
    setDiary(data?.content ?? "");
    setMode("view");
  };
  const handleModifyDiary = () => {
    setDiary(data?.content ?? "");
    setMode("edit");
  };
  const handleUpdateDiary = () => {
    const originalDiary = data?.content;
    if (!diary.trim()) return toast.error("수정할 내용을 적어주세요.");

    if (diary.trim() === originalDiary?.trim()) {
      setDiary("");
      setMode("view");
      return toast.success("수정한 내용이 없습니다.");
    }
    updateMutate(
      {
        diary_date: dateKey,
        content: diary,
      },
      {
        onSuccess: () => {
          localStorage.removeItem(`draft-${dateKey}`);
          setDiary("");
          setMode("view");
          toast.success("일기가 수정됐습니다.");
        },
      },
    );
  };
  const handleDeleteDiary = () => {
    const ok = confirm("정말 삭제하시겠습니까?");
    if (!ok) return;

    deleteMutate(
      {
        diary_date: dateKey ?? "",
      },
      {
        onSuccess: () => {
          setDiary("");
          setMode("view");
          toast.success("일기가 삭제됐습니다.");
        },
      },
    );
  };

  let content;
  if (isLoading) {
    content = <p>로딩 중...</p>;
  } else if (isError) {
    content = <p>에러 입니다.</p>;
  } else {
    content = (
      <DiaryContent
        data={data?.content}
        mode={mode}
        content={diary}
        // setContent={setDiary}
        setContent={handleChange}
      />
    );
  }
  return (
    <div className="mt-5 md:mt-0 flex-1 bg-white text-black p-6 rounded-2xl shadow-md">
      <div className="flex items-center justify-between">
        <small>
          일기는 날짜당 <br className="block sm:hidden" />
          하나만 가능합니다.
        </small>
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
      <div className="h-35 sm:h-75 relative">{content}</div>
    </div>
  );
}
