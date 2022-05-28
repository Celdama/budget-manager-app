/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';

import { auth, provider } from '../../config/firebaseConfig';
import { AuthUser } from '../../model/AuthUser';
import { NamedSetState } from '../middlewares/middleware';
import { MyState } from '../useStore';

export interface AuthUserSlice {
  authUser: object;
  registerUser: (user: AuthUser, password: string) => void;
  registerUserWithGoogle: () => void;
  signInUser: (email: string, password: string) => void
}

const createAuthUserSlice = (
  set: NamedSetState<MyState>,
  get: NamedSetState<MyState>,
) => ({
  authUser: {},
  registerUser: async (user: AuthUser, password: string) => {
    const { email, displayName, photoURL } = user;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { user } = userCredential;
        updateProfile(user, {
          displayName,
          photoURL,
        });
        set({ authUser: user }, false, 'authUser.registerUser');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  },
  registerUserWithGoogle: async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const { user } = result;
        console.log(user);
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const { email } = error.customData;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorMessage);
      });
  },
  signInUser: async (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { uid, displayName, photoURL } = userCredential.user;
        set({ authUser: { email, uid, displayName, photoURL } }, false, 'authUser.signInUser');
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  },
});

export default createAuthUserSlice;
