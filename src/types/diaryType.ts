export type Mode = "view" | "create" | "edit";

export type MypageMode = Exclude<Mode, "create">;
