import { AuthUser } from '../../../model/AuthUser';
import { Transaction } from '../../../model/Transaction';

export type TransactionsProps = {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  getTransactions: (authUserId: string) => void;
  deleteTransaction: (transaction: Transaction) => void;
  authUser: AuthUser;
}
