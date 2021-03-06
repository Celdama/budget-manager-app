/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { arrayRemove, arrayUnion, collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';

import { db } from '../../config/firebaseConfig';
import { Transaction } from '../../model/Transaction';
import { NamedSetState } from '../middlewares/middleware';
import { MyState } from '../useStore';

export interface TransactionSlice {
  transactions: Transaction[];
  getTransactions: (authUserId: string) => void;
  addTransaction: (transaction: Transaction, currentUserAmount: number) => void;
  deleteTransaction: (
    transaction: Transaction,
    currentUserAmount: number
  ) => void;
}

const createTransactionSlice = (
  set: NamedSetState<MyState>,
  get: NamedSetState<MyState>,
) => ({
  transactions: [],
  getTransactions: (authUserId: string) => {
    const transactionsCollectionRef = collection(db, 'transactions');
    const authUserTransactionsList: Transaction[] = [];
    getDocs(transactionsCollectionRef)
      .then((docs) => {
        docs.forEach((doc) => {
          const { name, amount, uid, date, category, userId } = doc.data();
          if (userId === authUserId) {
            authUserTransactionsList.push({
              name,
              amount,
              uid,
              date,
              category,
              userId,
            });
          }
        });
      })
      .then(() => {
        set(
          { transactions: [...authUserTransactionsList] },
          false,
          'transactionSlice.getTransactions',
        );
      })
      .catch((error) => {
        console.log(error);
      });
  },
  addTransaction: (transaction: Transaction, currentUserAmount: number) => {
    const { uid, userId, amount, category } = transaction;
    const transactionsDoc = doc(db, 'users', userId);
    setDoc(doc(db, 'transactions', uid), {
      ...transaction,
    })
      .then(() => {
        updateDoc(transactionsDoc, {
          transactionsId: arrayUnion(uid),
          amount:
            category === 'expense'
              ? currentUserAmount - amount
              : currentUserAmount + amount,
        });
      })
      .then(() => {
        set(
          (state) => ({
            ...state,
            currentUser: {
              ...state.currentUser,
              amount:
                category === 'expense'
                  ? currentUserAmount - amount
                  : currentUserAmount + amount,
            },
            transactions: [...state.transactions, transaction],
          }),
          false,
          'transactionSlice.addTransaction',
        );
      })
      .catch((error) => {
        console.log(error);
      });
  },
  deleteTransaction: (transaction: Transaction, currentUserAmount: number) => {
    const { uid, userId, amount, category } = transaction;
    const transactionsDoc = doc(db, 'users', userId);
    deleteDoc(doc(db, 'transactions', uid))
      .then(() => {
        updateDoc(transactionsDoc, {
          transactionsId: arrayRemove(uid),
          amount:
            category === 'expense'
              ? currentUserAmount + amount
              : currentUserAmount - amount,
        });
      })
      .then(() => {
        set(
          (state) => ({
            ...state,
            currentUser: {
              ...state.currentUser,
              amount:
                category === 'expense'
                  ? currentUserAmount + amount
                  : currentUserAmount - amount,
            },
            transactions: state.transactions.filter(
              (transaction) => transaction.uid !== uid,
            ),
          }),
          false,
          'transactionSlice.deleteTransaction',
        );
      })
      .catch((error) => {
        console.log(error);
      });
  },
});

export default createTransactionSlice;
