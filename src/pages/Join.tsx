import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { joinSchema, type JoinFormValues } from "@/schema/auth/join.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "@/api/auth.api";
import { toast } from "sonner";

export default function Join() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinFormValues>({
    resolver: zodResolver(joinSchema),
  });
  const naviagate = useNavigate();
  const onSubmit: SubmitHandler<JoinFormValues> = async (data) => {
    const result = await signUp(data.email, data.password, data.name);
    if (!result.success) {
      toast.error(result.error ?? "회원가입이 실패했습니다.");
      return;
    }
    toast.success("회원가입이 되었습니다.");
    naviagate("/");
  };
  return (
    <div className="max-w-3xl mx-auto py-10 flex justify-center">
      <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="form-name">닉네임</FieldLabel>
            <Input
              id="form-name"
              type="text"
              placeholder="닉네임을 적어주세요."
              {...register("name")}
            />
            <p>{errors.name?.message}</p>
          </Field>
          <Field>
            <FieldLabel htmlFor="form-email">이메일</FieldLabel>
            <Input
              id="form-email"
              type="email"
              placeholder="john@example.com"
              {...register("email")}
            />
            <p>{errors.email?.message}</p>
          </Field>
          <Field>
            <FieldLabel htmlFor="form-password">비밀번호</FieldLabel>
            <Input
              id="form-password"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              {...register("password")}
            />
            <p>{errors.password?.message}</p>
          </Field>
          <Field>
            <FieldLabel htmlFor="form-password-confirm">
              비밀번호 확인
            </FieldLabel>
            <Input
              id="form-password-confirm"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              {...register("passwordConfirm")}
            />
            <p>{errors.passwordConfirm?.message}</p>
          </Field>
          <Link to={"/login"}>
            <FieldDescription>로그인 ➔</FieldDescription>
          </Link>
          <Button type="submit" className="cursor-pointer">
            회원가입
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
