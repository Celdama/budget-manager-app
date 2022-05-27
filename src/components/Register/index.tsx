import { nanoid } from 'nanoid';
import { MouseEvent, ReactElement, useState } from 'react';

import { Input } from '../../layouts/Input';
import useStore from '../../store/useStore';

export const Register = (): ReactElement => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    avatar: '',
  });
  const registerUser = useStore(({ registerUser }) => registerUser);
  const addUser = useStore(({ addUser }) => addUser);

  const { username, email, password, avatar } = formData;

  const handleRegisterUser = async (
    e: MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (email.length && password.length) {
      const newUser = {
        email,
        uid: nanoid(),
        displayName: username,
        photoURL: avatar,
      };

      await registerUser(newUser, password);
      // METTRE UNE CONDITION ICI, ENREGISTRER L4USER DANS LA DB QUE SI IL EST AUTH
      addUser({
        ...newUser,
        amount: 0,
        investAmount: 0,
        totalAmount: 0,
        transactionId: [],
      });
      // redirect to profile page to let user add transactions and account
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.target as HTMLInputElement;

    setFormData(((prevState) => ({
      ...prevState,
      [name]: value,
    })));
  };

  return (
    <>
      <h1>Register here</h1>
      <form>
        <Input
          name="email"
          value={email}
          placeholder="email"
          onChange={handleChange}
        />
        <Input
          name="password"
          value={password}
          placeholder="password"
          onChange={handleChange}
        />
        <Input
          name="username"
          value={username}
          placeholder="username"
          onChange={handleChange}
        />
        <Input
          name="avatar"
          value={avatar}
          placeholder="avatar URL"
          onChange={handleChange}
        />
        <button type="submit" onClick={handleRegisterUser}>
          Register
        </button>
      </form>
    </>
  );
};
