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
  authUser: {
    email: '',
    uid: '',
    displayName: '',
    photoURL: '',
  },
  registerUser: async (user: AuthUser, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      user.email,
      password,
    );

    const { email, uid } = userCredential.user;
    await updateProfile(userCredential.user, {
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
    set({
      authUser: {
        email,
        uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
    }, false, 'authUser.registerUser');

    const test = getAuth();
    console.log(test);
  },
});

export default createAuthUserSlice;
