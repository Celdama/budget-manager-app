/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { User } from '../model/User';
import { addUser } from './firebase/callFirebase';
import { NamedSetState } from './middlewares/middleware';
import { MyState } from './useStore';

export interface UserSlice {
  users: User[];
  addUser: (user: User) => void;
}

const createUserSlice = (
  set: NamedSetState<MyState>,
  get: NamedSetState<MyState>,
) => ({
  users: [],
  addUser: async (user: User) => {
    await addUser(user);
    set(({ users }) => ({ users: [...users, user] }), false, 'users.addUser');
  },
});

export default createUserSlice;
