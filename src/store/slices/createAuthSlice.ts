/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';

import { auth } from '../../config/firebaseConfig';
import { AuthUser } from '../../model/AuthUser';
import { NamedSetState } from '../middlewares/middleware';
import { MyState } from '../useStore';

export interface AuthUserSlice {
  authUser: object;
  registerUser: (user: AuthUser, password: string) => void;
  signInUser: (email: string, password: string) => void
}

const createAuthUserSlice = (
  set: NamedSetState<MyState>,
  get: NamedSetState<MyState>,
) => ({
  authUser: {},
  registerUser: async (user: AuthUser, password: string) => {
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
      set({ authUser: user }, false, 'authUser.registerUser');
    } catch (err) {
      console.log(err);
    }
  },
  signInUser: async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const { uid, displayName, photoURL } = userCredential.user;
      set({ authUser: { email, uid, displayName, photoURL } }, false, 'authUser.signInUser');
    } catch (err) {
      console.log(err);
    }
  },
});

export default createAuthUserSlice;
