/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';

import { auth, provider } from '../../config/firebaseConfig';
import { AuthUser } from '../../model/AuthUser';
import { NamedSetState } from '../middlewares/middleware';
import useStore, { MyState } from '../useStore';

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
  authUser: {
    uid: '',
    displayName: '',
    email: '',
    photoURL: '',
  },

  registerUserWithGoogle: () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const { user } = result;
        // const name = user.displayName;
        const { displayName, uid, email, photoURL } = user;
        set({
          authUser: { displayName, uid, email, photoURL },
          isAuthUser: true,
        }, false, 'authUser.registerUserWithGoogle');
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
        set({ authUser: { email, displayName, uid, photoURL } }, false, 'authUser.getAuthUser');
      } else {
        console.log('not login');
      }
    });
  },
});

export default createAuthUserSlice;
