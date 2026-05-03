export type Mode = "view" | "create" | "edit" | "draft";

export type MypageMode = Exclude<Mode, "create" | "draft">;
