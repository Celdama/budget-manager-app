/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AuthUser } from '../model/AuthUser';
import { registerUserToFirebase } from './firebase/callFirebase';
import { NamedSetState } from './middlewares/middleware';
import { MyState } from './useStore';

export interface AuthUserSlice {
  authUser: object;
  registerUser: (user: AuthUser, password: string) => void;
}

const createAuthUserSlice = (
  set: NamedSetState<MyState>,
  get: NamedSetState<MyState>,
) => ({
  authUser: {},
  registerUser: async (user: AuthUser, password: string) => {
    await registerUserToFirebase(user, password);
    set({ authUser: user }, false, 'authUser.registerUser');
  },
});

export default createAuthUserSlice;
