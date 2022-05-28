import { ReactElement } from 'react';

import useStore from '../../store/useStore';

export const RegisterGoogle = (): ReactElement => {
  const registerUserWithGoogle = useStore(
    ({ registerUserWithGoogle }) => registerUserWithGoogle,
  );

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
