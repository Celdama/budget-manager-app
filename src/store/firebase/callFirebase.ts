/* eslint-disable no-promise-executor-return */
/* eslint-disable prefer-promise-reject-errors */
import { doc, setDoc } from 'firebase/firestore';

import { db } from '../../config/firebaseConfig';
import { Transaction } from '../../model/Transaction';
import { User } from '../../model/User';

export const addUserToFirebase = async (user: User): Promise<User> => {
  const { uid } = user;
  try {
    await setDoc(doc(db, 'users', uid), {
      ...user,
    });
    return user;
  } catch (err) {
    return Promise.reject(new Error('add user to firebase failed'));
  }
};

export const addTransactionToFirebase = async (
  transaction: Transaction,
): Promise<Transaction> => {
  const { uid } = transaction;
  try {
    await setDoc(doc(db, 'transactions', uid), {
      ...transaction,
    });
    return transaction;
  } catch (err) {
    return Promise.reject(new Error('add transaction to firebase failed'));
  }
};
