import { AuthUser } from '../../../model/AuthUser';
import { User } from '../../../model/User';

export type RegisterGoogleProps = {
  isAuthUser: boolean;
  authUser: AuthUser;
  addUserInFirestore: (user: User) => void;
  registerUserWithGoogle: () => void;
}
