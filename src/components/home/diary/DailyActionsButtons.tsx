import Button from "@/components/Button";
import { useAuthStore } from "@/stores/auth.store";
import type { Mode } from "@/types/diaryType";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const handleCreateDiary = () => {
    if (!user) {
      toast.error("로그인을 해주세요.");
      navigate("/login");
    }
    setMode("create");
  };
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
          <Button onClick={onUpdate}>수정 완료</Button>
          <Button variant="light" onClick={onReject}>
            작성 취소
          </Button>
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
          <Button onClick={handleCreateDiary}>일기 작성</Button>
        ))}
    </div>
  );
}
