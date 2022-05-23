import { Transaction } from '../model/Transaction';
import { NamedSetState } from './middlewares/middleware';
import { MyState } from './useStore';

export interface TransactionSlice {
  transactions: Transaction[];
}

const createTransactionSlice = (
  set: NamedSetState<MyState>,
  get: NamedSetState<MyState>,
) => ({
  transactions: [],
  addTransaction: async (transaction: Transaction) => {
    await addTransactionToFirebase(transaction);
  },
});
