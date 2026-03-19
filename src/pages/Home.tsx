import Diary from "@/components/home/diary/Diary";

export default function Home() {
  return (
    <section className="p-5">
      <div className="max-w-5xl mx-auto">
        <h2 className="mb-2 text-center">
          보고싶은 일기가 있다면
          <br /> 날짜를 클릭해주세요.
        </h2>

        <Diary />
      </div>
    </section>
  );
}
