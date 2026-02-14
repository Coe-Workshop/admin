import { ItemTransaction } from "@/app/types/api/table";

export interface TransactionInfoProps extends ItemTransaction {
  onClose: () => void;
}

// export interface ItemTransaction extends BaseTransaction {
//   user: User;
//   startedAt: string;
// }

// export interface User {
//   phone: string;
//   profileUrl: string;
//   userName: string;
// }
// export interface BaseTransaction {
//   endedAt: string;
//   message: string;
//   status: Status;
// }

