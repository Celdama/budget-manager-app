import { MouseEvent, ReactElement, useState } from 'react';

import useStore from '../../store/useStore';

export const TestLog = (): ReactElement => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [avatar, setAvatar] = useState('');
  const { registerUser } = useStore();

  const handleRegisterUser = async (
    e: MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (email.length && password.length) {
      await registerUser(email, password, userName, avatar);
      setEmail('');
      setPassword('');
      setUserName('');
      setAvatar('');
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
        <br />
        <input
          className="outline m-4"
          type="text"
          name="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <input
          className="outline m-4"
          type="text"
          name="avatar"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
        <br />
        <button type="submit" onClick={(e) => handleRegisterUser(e)}>
          Register
        </button>
      </form>
    </>
  );
};
