export type Role = "USER" | "CHATBOT" | "SYSTEM" | "TOOL";

export type MessageItem = {
  role: Role;
  message: string;
  created_at: Date;
  id: string;
};

export type ChatHistory = MessageItem[];

export type RecordItem = {
  type: string;
  value: string;
};

export type Target = RecordItem[];

export type UserInfo = RecordItem[];

export type IntegrationType = "tg" | "browser";

export type Integration = {
  type: IntegrationType;
  id: string;
};
