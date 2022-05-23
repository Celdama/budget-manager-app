/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';

import { auth } from '../config/firebaseConfig';
import { AuthUser } from '../model/AuthUser';
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
    const { email, displayName, photoURL } = user;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await updateProfile(userCredential.user, {
      displayName,
      photoURL,
    });
    set({ authUser: user }, false, 'authUser.registerUser');

    const test = getAuth();
    console.log(test);
  },
});

export default createAuthUserSlice;
