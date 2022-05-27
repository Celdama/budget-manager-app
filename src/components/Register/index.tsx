import { nanoid } from 'nanoid';
import { MouseEvent, ReactElement, useState } from 'react';

import useStore from '../../store/useStore';

export const Register = (): ReactElement => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    avatar: '',
  });
  const registerUser = useStore((state) => state.registerUser);
  const addUser = useStore((state) => state.addUser);

  const handleRegisterUser = async (
    e: MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (formData.email.length && formData.password.length) {
      const newUser = {
        email: formData.email,
        uid: nanoid(),
        displayName: formData.username,
        photoURL: formData.avatar,
      };

      await registerUser(newUser, formData.password);
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
      <div>test log</div>
      <form>
        <input
          className="outline m-4"
          type="text"
          name="email"
          value={formData.email}
          placeholder="email"
          onChange={handleChange}
        />
        <br />
        <input
          className="outline m-4"
          type="password"
          name="password"
          value={formData.password}
          placeholder="password"
          onChange={handleChange}
        />
        <br />
        <br />
        <input
          className="outline m-4"
          type="text"
          name="username"
          value={formData.username}
          placeholder="username"
          onChange={handleChange}
        />
        <br />
        <input
          className="outline m-4"
          type="text"
          name="avatar"
          placeholder="avatar URL"
          value={formData.avatar}
          onChange={handleChange}
        />
        <br />
        <button type="submit" onClick={(e) => handleRegisterUser(e)}>
          Register
        </button>
      </form>
    </>
  );
};
