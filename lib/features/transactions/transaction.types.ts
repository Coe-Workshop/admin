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
  tel: string;
  profileUrl: string | "https://scontent.fbkk29-7.fna.fbcdn.net/v/t39.30808-6/518286244_1882271499281422_5130747764751858026_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH-uv7dmphE3wD-s8pwONbNQx-Txl76GCRDH5PGXvoYJJd31TR6qIkv2gxdpgeWZ53mxou7a0hrAlI18sPYPYbF&_nc_ohc=HSqBT9ZT2VoQ7kNvwF-v31Z&_nc_oc=AdlOZj0klek5K7F2i6SeYoJXzNrl4e1jRUCTG8xi96DAbKcBJ5Dj9Eq5r-GBz5MhVig&_nc_zt=23&_nc_ht=scontent.fbkk29-7.fna&_nc_gid=R1QVQvJm4vUiAixmHRCIlA&oh=00_AfsEzZ-YSZ3Z8NLeZZlKmTJtmIUggJ_iTqz3DYEM-avqtQ&oe=699655C4";
  userName: string;
}

export interface AssetTransactionRecord {
  user: User;
  status: TransactionsStatus;
  endedAt: ISODateString;
  message: string | "no message attatch";
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
[];

export interface ErrorResponse {
  success: boolean;
  error: string;
}

// request success
/*
{status: , data{success: true, }}

รอเปลี่ยน error data 
{status: false, data{success: false, error: string}}
 */
