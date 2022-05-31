/* eslint-disable consistent-return */
import { ReactElement, useEffect } from 'react';

import useStore from '../../store/useStore';
import { RegisterGoogleProps } from './Types/registerGoogleProps';

const RegisterGoogle = ({
  isAuthUser,
  authUser,
  addUser,
  registerUserWithGoogle,
}: RegisterGoogleProps): JSX.Element => {
  useEffect(() => {
    if (isAuthUser) {
      const newUser = {
        ...authUser,
        amount: 0,
        investAmount: 0,
        totalAmount: 0,
        transactionsId: [],
      };
      addUser(newUser);
    }
  }, [isAuthUser]);

  return (
    <>
      <h1>Google </h1>
      <button
        type="button"
        className="border p-4 bg-red-300 capitalize text-gray-700 border-gray-700 rounded-md  white"
        onClick={registerUserWithGoogle}
      >
        register with google
      </button>
    </>
  );
};

export const RegisterGoogleStore = (): ReactElement => {
  const isAuthUser = useStore((state) => state.isAuthUser);
  const authUser = useStore((state) => state.authUser);
  const addUser = useStore((state) => state.addUser);
  const registerUserWithGoogle = useStore(
    (state) => state.registerUserWithGoogle,
  );

  return (
    <RegisterGoogle
      isAuthUser={isAuthUser}
      authUser={authUser}
      addUser={addUser}
      registerUserWithGoogle={registerUserWithGoogle}
    />
  );
};
