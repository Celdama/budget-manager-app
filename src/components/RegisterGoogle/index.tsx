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
      console.log('user connected');
      const newUser = {
        ...authUser,
        amount: 0,
        investAmount: 0,
        totalAmount: 0,
        transactionsId: [],
      };
      console.log(newUser);
      addUser(newUser);
    }
  }, [isAuthUser]);

  const test = async (): Promise<void> => {
    try {
      registerUserWithGoogle();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>Google </h1>
      <button
        type="button"
        className="border p-4 bg-red-300 capitalize text-gray-700 border-gray-700 rounded-md  white"
        onClick={test}
      >
        register with google
      </button>
    </>
  );
};
