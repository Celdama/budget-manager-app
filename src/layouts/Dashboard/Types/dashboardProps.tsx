import { Transaction } from '../../../model/Transaction';
import { AuthUser } from '../../../model/AuthUser';

export type DashboardProps = {
  authUser: AuthUser
  transactions: Transaction[];
  getTransactions: (authUserId: string) => void;
}
