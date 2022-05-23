/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';

import { auth } from '../config/firebaseConfig';
import { NamedSetState } from './middlewares/middleware';
import { MyState } from './useStore';

export interface AuthUserSlice {
  authUser: object;
  registerUser: (registerEmail: string, registerPassword: string, userName: string, avatar: string) => void;
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
  registerUser: async (
    registerEmail: string,
    registerPassword: string,
    userName: string,
    avatar: string,
  ) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      registerEmail,
      registerPassword,
    );

    const { email, uid } = userCredential.user;
    await updateProfile(userCredential.user, {
      displayName: userName,
      photoURL: avatar,
    });
    set({ authUser: { email, uid, displayName: userName, photoURL: avatar } });

    const test = getAuth();
    console.log(test);
  },
});

export default createAuthUserSlice;
