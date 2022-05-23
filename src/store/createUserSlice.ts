/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { User } from '../model/User';
import { NamedSetState } from './middlewares/middleware';
import { MyState } from './useStore';


export interface UserSlice {
  users: User[];
  // addUser: ()
}

const createUserSlice = (
  set: NamedSetState<MyState>,
  get: NamedSetState<MyState>,
) => ({
  users: [],
  addUser: async () => {
    set();
  },
});
