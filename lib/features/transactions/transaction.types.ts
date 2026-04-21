// time response format is // ISO 8601 format: YYYY-MM-DDTHH:mm:ss.sss
export type ISODateString = string & { __isoDateBrand: never };

// three lastest status according to TOOM mockdata
export enum TransactionsStatus {
  REJECT = "REJECT",
  RESERVE = "RESERVE",
  APPROVE = "APPROVE",
  Finished = "finished",
  Cancel = "Cancel",
  Blank = "Blank",
}

export interface User {
  phone: string;
  profileUrl: string | "";
  userName: string;
}

export interface AssetTransactionRecord {
  id: number;
  user: User;
  status: TransactionsStatus;
  endedAt: ISODateString;
  message: string | "-";
  startedAt: ISODateString;
}
export type AssetTransactionRecords = AssetTransactionRecord[];

export interface AssetTransaction {
  assetID: string;
  transactions: AssetTransactionRecords;
}

export type AssetTransactions = AssetTransaction[];

// จิงๆ fieldมันเยอะกว่านี้แต่ข้อมูลนี้ใช้กับเส้นget Toolละ รอคุยอีกที
export interface ToolTransactionData {
  assets: AssetTransactions;
  // itemName
}

export interface ToolTransactionResponse {
  success: boolean;
  data: ToolTransactionData;
}

export interface ToolTransactionByDate {
  date: ISODateString | null;
  data: ToolTransactionData;
}
export type ToolTransactionsByDate = ToolTransactionByDate[];

export interface ErrorResponse {
  success: boolean;
  error: string;
}

export interface SentTransactionStatus { 
  transactionId?: number | string;
  status: TransactionsStatus;
  message: string;
}

export interface TranactionQueryElement {
  toolId?: number|null, 
  userId?: string|null, 
  date?: ISODateString|null, 
  page?: number|null
}

// request success
/*
{status: , data{success: true, }}

รอเปลี่ยน error data 
{status: false, data{success: false, error: string}}
 */
