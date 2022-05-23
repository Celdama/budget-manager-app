/* eslint-disable no-promise-executor-return */
/* eslint-disable prefer-promise-reject-errors */
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { auth, db } from '../../config/firebaseConfig';
import { AuthUser } from '../../model/AuthUser';
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

export const registerUserToFirebase = async (
  user: AuthUser,
  password: string,
): Promise<object> => {
  const { email, displayName, photoURL } = user;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await updateProfile(userCredential.user, {
      displayName,
      photoURL,
    });
    return userCredential.user;
  } catch (err) {
    return Promise.reject(new Error('register user to firebase failed'));
  }
};

export const signInUserToFirebase = async (
  email: string,
  password: string,
): Promise<object> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
  } catch (err) {
    return Promise.reject(new Error('sign in user to firebase failed'));
  }
};
