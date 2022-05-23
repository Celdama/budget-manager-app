/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Transaction } from '../model/Transaction';
import { addTransactionToFirebase } from './firebase/callFirebase';
import { NamedSetState } from './middlewares/middleware';
import { MyState } from './useStore';


export interface TransactionSlice {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
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

export default createTransactionSlice;
