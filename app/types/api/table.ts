import { BaseTransaction } from "./transaction";
import { User } from "./user";

interface ItemTransaction extends BaseTransaction {
  user: User;
  startTime: string;
}

export interface ItemTableTransaction {
  assetId: string;
  itemTransaction: ItemTransaction[];
}

interface AdminTransaction extends BaseTransaction {
  itemName: string;
  assetId: string;
  startTime: string;
}

export interface AdminTableTransaction {
  user: User;
  adminTransactions: AdminTransaction[];
}
