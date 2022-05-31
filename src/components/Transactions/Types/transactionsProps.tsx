import { AuthUser } from '../../../model/AuthUser';
import { Transaction } from '../../../model/Transaction';
import { User } from '../../../model/User';

export type TransactionsProps = {
  transactions: Transaction[];
  authUser: AuthUser;
  currentUser: User;
  addTransaction: (transaction: Transaction, currentUserAmount: number) => void;
  getTransactions: (authUserId: string) => void;
  deleteTransaction: (transaction: Transaction) => void;
  setCurrentUser: (userId: string) => void;
}
