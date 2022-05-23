/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../config/firebaseConfig';
import { NamedSetState } from './middlewares/middleware';
import { MyState } from './useStore';

export interface AuthUserSlice {
  authUser: object;
  registerUser: (registerEmail: string, registerPassword: string) => void
}

const createAuthUserSlice = (
  set: NamedSetState<MyState>,
  get: NamedSetState<MyState>,
) => ({
  authUser: {
    email: '',
    uid: '',
    displayName: '',
    photoURL: '',
  },
  registerUser: async (registerEmail: string, registerPassword: string) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      registerEmail,
      registerPassword,
    );
    set({ authUser: await userCredential });
  },
});

export default createAuthUserSlice;
