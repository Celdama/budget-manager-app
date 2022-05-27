/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { doc, setDoc } from 'firebase/firestore';

import { db } from '../../config/firebaseConfig';
import { User } from '../../model/User';
import { NamedSetState } from '../middlewares/middleware';
import { MyState } from '../useStore';

export interface UserSlice {
  users: User[];
  addUser: (user: User) => void;
}

const createUserSlice = (
  set: NamedSetState<MyState>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  get: NamedSetState<MyState>,
) => ({
  users: [],
  addUser: async (user: User) => {
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
});

export default createUserSlice;
