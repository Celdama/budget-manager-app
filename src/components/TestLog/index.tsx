import { MouseEvent, ReactElement, useState } from 'react';

import useStore from '../../store/useStore';

export const TestLog = (): ReactElement => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { registerUser } = useStore();

  const handleRegisterUser = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (email.length && password.length) {
      registerUser(email, password);
      setEmail('');
      setPassword('');
    }
  };

  return (
    <>
      <div>test log</div>
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
        <button type="submit" onClick={(e) => handleRegisterUser(e)}>
          Register
        </button>
      </form>
    </>
  );
};
