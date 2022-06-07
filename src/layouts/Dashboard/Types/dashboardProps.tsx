import { Transaction } from '../../../model/Transaction';
import { AuthUser } from '../../../model/AuthUser';
import { User } from '../../../model/User';

export type DashboardProps = {
  authUser: AuthUser;
  currentUser: User;
  transactions: Transaction[];
  getTransactions: (authUserId: string) => void;
  setCurrentUser: (userId: string) => void;
}
