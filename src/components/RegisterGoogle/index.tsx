/* eslint-disable consistent-return */
import { ReactElement, useEffect } from 'react';

import useStore from '../../store/useStore';

export const RegisterGoogle = (): ReactElement => {
  const registerUserWithGoogle = useStore(
    ({ registerUserWithGoogle }) => registerUserWithGoogle,
  );

  const addUser = useStore(
    ({ addUser }) => addUser,
  );

  const isAuthUser = useStore(
    ({ isAuthUser }) => isAuthUser,
  );

  const authUser = useStore(
    ({ authUser }) => authUser,
  );

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
