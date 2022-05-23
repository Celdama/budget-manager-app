import { Transaction } from '../model/Transaction';
import { addTransactionToFirebase } from './firebase/callFirebase';
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
    set(
      ({ transactions }) => ({ transactions: [...transactions, transaction] }),
      false,
      'transactions.addTransaction',
    );
  },
});
