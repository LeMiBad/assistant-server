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

export interface Subscription {
  tarif: 1 | 2 | 3
  isActive: boolean
  lastActivateDate: Date
  duration: number
}

export type NomenclatureIntegrationTyps = 'yml' | 'sheets'

export interface NomenclatureItem {
  id: string;
  name: string;
  description?: string;
  price: {
    value: number,
    currency: string
  }
  uomId: number;
  quantity?: number;
  imageLink?: string;
  uom?: string
}


export interface Nomenclature {
  integrationType: NomenclatureIntegrationTyps
  items: NomenclatureItem[]
}
