/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';

import { db } from '../../config/firebaseConfig';
import { Transaction } from '../../model/Transaction';
import { NamedSetState } from '../middlewares/middleware';
import { MyState } from '../useStore';

export interface TransactionSlice {
  transactions: Transaction[];
  getTransactions: () => void;
  addTransaction: (transaction: Transaction) => void;
}

const transactionsCollectionRef = collection(db, 'transactions');

const createTransactionSlice = (
  set: NamedSetState<MyState>,
  get: NamedSetState<MyState>,
) => ({
  transactions: [],
  getTransactions: async () => {
    try {
      const docs = await getDocs(transactionsCollectionRef);
      const arr: Transaction[] = [];
      docs.forEach((doc) => {
        const { name, amount, uid, date, category, userId } = doc.data();
        arr.push({ name, amount, uid, date, category, userId });
      });
      set((state) => ({
        ...state,
        transactions: [...arr],
      }), false, 'transactions.getTransactions');
    } catch (err) {
      console.log(err);
    }
  },
  addTransaction: async (transaction: Transaction) => {
    console.log('from transaction', transaction);
    const { uid } = transaction;
    try {
      await setDoc(doc(db, 'transactions', uid), {
        ...transaction,
      });
      set(
        ({ transactions }) => ({
          transactions: [...transactions, transaction],
        }),
        false,
        'transactions.addTransaction',
      );
    } catch (err) {
      console.log(err);
    }
  },
});

export default createTransactionSlice;
