import Button from "@/components/Button";
import type { Mode } from "@/types/diaryType";

type DailyActionsButtonsProps = {
  onModify: () => void;
  onUpdate: () => void;
  onCreate: () => void;
  onReject: () => void;
  onDelete: () => void;
  setMode: (mode: Mode) => void;
  mode: Mode;
  data?: string;
};

export default function DailyActionsButtons({
  onModify,
  onUpdate,
  onCreate,
  onReject,
  onDelete,
  setMode,
  data,
  mode,
}: DailyActionsButtonsProps) {
  //   const hasDiary = data && data.length > 0;

  return (
    <div className="flex gap-2">
      {mode === "create" && (
        <>
          <Button variant="light" onClick={onCreate}>
            일기 추가
          </Button>
          <Button onClick={onReject}>작성 취소</Button>
        </>
      )}

      {mode === "edit" && (
        <>
          <Button variant="light" onClick={onUpdate}>
            수정 완료
          </Button>
          <Button onClick={onReject}>작성 취소</Button>
        </>
      )}

      {mode === "view" &&
        (data ? (
          <>
            <Button onClick={onModify}>일기 수정</Button>
            <Button variant="light" onClick={onDelete}>
              일기 삭제
            </Button>
          </>
        ) : (
          <Button onClick={() => setMode("create")}>일기 작성</Button>
        ))}
    </div>
  );
}
