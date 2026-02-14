import { BaseTransaction } from "./transaction";
import { User } from "./user";

export interface ItemTransaction extends BaseTransaction {
  user: User;
  startedAt: string;
}

export interface ItemTableTransaction {
  assetID: string;
  transactions: ItemTransaction[];
}

interface AdminTransaction extends BaseTransaction {
  itemName: string;
  assetID: string;
  startedAt: string;
}

export interface AdminTableTransaction {
  user: User;
  adminTransactions: AdminTransaction[];
}
