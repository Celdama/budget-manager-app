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
      set(
        ({ users }) => ({ users: [...users, user] }),
        false,
        'userSlice.addUser',
      );
    } catch (err) {
      console.log(err);
    }
  },
  setCurrentUser: async (userId: string) => {
    const docRef = doc(db, 'users', userId);
    try {
      const docSnap = await getDoc(docRef);
      console.log('document data', docSnap.data());
      set(
        { currentUser: docSnap.data() as User },
        false,
        'userSlice.setCurrentUser',
      );
    } catch (error) {
      console.log(error);
    }
  },
});

export default createUserSlice;
