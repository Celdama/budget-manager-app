/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { db } from '../../config/firebaseConfig';
import { User } from '../../model/User';
import { NamedSetState } from '../middlewares/middleware';
import { MyState } from '../useStore';

export interface UserSlice {
  users: User[];
  currentUser: User;
  addUserInFirestore: (user: User) => void;
  setCurrentUser: (userId: string) => void;
}

const createUserSlice = (
  set: NamedSetState<MyState>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  get: NamedSetState<MyState>,
) => ({
  users: [],
  currentUser: <User>{},
  addUserInFirestore: async (user: User) => {
    const { uid } = user;
    try {
      await setDoc(doc(db, 'users', uid), {
        ...user,
      });
      set(({ users }) => ({ users: [...users, user] }), false, 'users.addUser');
    } catch (err) {
      console.log(err);
    }
  },
  setCurrentUser: async (userId: string) => {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('document data', docSnap.data());
    } else {
      console.log('no such document');
    }
  },
});

export default createUserSlice;
