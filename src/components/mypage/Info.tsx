import { useNavigate } from "react-router-dom";
import Button from "../Button";

export default function Info({
  greetHours,
  diaryCount,
  nickname,
}: {
  greetHours: string;
  diaryCount: number | null | undefined;
  nickname: string;
}) {
  const navigate = useNavigate();

  return (
    <div className="bg-white/10 shadow-2xl p-5 dark:text-foreground text-background rounded-xs">
      <h2 className="text-lg font-medium">
        좋은 <b>{greetHours}</b> 입니다!
      </h2>
      <h3 className="text-md font-medium">{nickname}님의 마이페이지입니다.</h3>
      <p className="mt-5  whitespace-pre-line break-keep">
        현재까지 작성하신 게시물은 총
        <span className="mx-1 rounded bg-yellow-100 px-2 py-0.5 font-semibold text-yellow-700">
          {diaryCount ?? 0}개
        </span>
        입니다.
      </p>
      <p className="mt-5 mb-2">지금 바로 오늘의 일기를 작성하러 가세요!</p>
      <Button onClick={() => navigate("/")}> 작성하러 가기</Button>
    </div>
  );
}
