/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';

import { auth, provider } from '../../config/firebaseConfig';
import { AuthUser } from '../../model/AuthUser';
import { NamedSetState } from '../middlewares/middleware';
import { MyState } from '../useStore';

export interface AuthUserSlice {
  isAuthUser: boolean;
  authUser: AuthUser;
  registerUserWithGoogle: () => void;
  monitorAuthState: () => void
}

const createAuthUserSlice = (
  set: NamedSetState<MyState>,
  get: NamedSetState<MyState>,
) => ({
  isAuthUser: false,
  authUser: <AuthUser>{},
  registerUserWithGoogle: () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const { user } = result;
        const { displayName, uid, email, photoURL } = user;
        set({
          authUser: { displayName, uid, email, photoURL },
          isAuthUser: true,
        }, false, 'authSlice.registerUserWithGoogle');
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const { email } = error.customData;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorMessage);
      });
  },
  monitorAuthState: async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName, uid, photoURL } = user;
        set({ authUser: { email, displayName, uid, photoURL } }, false, 'authSlice.getAuthUser');
      } else {
        console.log('not login');
      }
    });
  },
});

export default createAuthUserSlice;
