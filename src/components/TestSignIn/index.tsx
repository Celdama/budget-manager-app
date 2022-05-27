import { MouseEvent, ReactElement, useState } from 'react';

import useStore from '../../store/useStore';

const SignIn = (): ReactElement => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signInUser } = useStore();

  const handleSignInUser = async (
    e: MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (email.length && password.length) {
      await signInUser(email, password);
    }
  };

  return (
    <>
      <div>Sign IN</div>
      <form>
        <input
          className="outline m-4"
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          className="outline m-4"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit" onClick={(e) => handleSignInUser(e)}>
          Sign in
        </button>
      </form>
    </>
  );
};

export default TestSignIn;
