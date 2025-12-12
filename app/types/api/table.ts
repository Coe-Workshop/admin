import { BaseTransaction } from "./transaction";
import { User } from "./user";

interface ItemTransaction extends BaseTransaction {
  user: User;
}

export interface ItemTableTransaction {
  assetID: string;
  itemTransaction: ItemTransaction[];
}

interface AdminTransaction extends BaseTransaction {
  itemName: string;
}

export interface AdminTableTransaction {
  user: User;
  adminTransactions: AdminTransaction[];
}
