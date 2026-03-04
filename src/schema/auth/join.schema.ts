import { z } from "zod";
export const joinSchema = z
  .object({
    name: z
      .string()
      .min(3, "3자 이상 입력하세요.")
      .max(10, "10자 이하로 입력하세요."),
    email: z.string().email("이메일 형식이 아닙니다"),
    password: z.string().min(8, "8자 이상 입력하세요."),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

export type JoinFormValues = z.infer<typeof joinSchema>;

// 구조 정의 / 타입 정의 / 검증 규칙 정의
