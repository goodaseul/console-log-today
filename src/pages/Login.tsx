import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";

type LoginInputs = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = (data) => console.log(data);

  return (
    <div className="max-w-3xl mx-auto py-10 flex justify-center">
      <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="form-email">이메일</FieldLabel>
            <Input
              id="form-email"
              type="email"
              placeholder="john@example.com"
              {...register("email", { required: "이메일을 입력해주세요." })}
            />
            <p>{errors.email?.message}</p>
          </Field>
          <Field>
            <FieldLabel htmlFor="form-password">비밀번호</FieldLabel>
            <Input
              id="form-password"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
              })}
            />
            <p>{errors.password?.message}</p>
          </Field>
          <Link to={"/join"}>
            <FieldDescription>회원 가입 ➔</FieldDescription>
          </Link>

          <Button type="submit" className="cursor-pointer">
            로그인
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
