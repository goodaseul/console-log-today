import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="max-w-3xl mx-auto py-10 flex justify-center">
      <form className="w-full max-w-sm">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="form-email">이메일</FieldLabel>
            <Input
              id="form-email"
              type="email"
              placeholder="john@example.com"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="form-password">비밀번호</FieldLabel>
            <Input
              id="form-password"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              required
            />
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
