import { nanoid } from 'nanoid';
import { ChangeEvent, FormEvent, useState } from 'react';

import useStore from '../../store/useStore';
import { InvestmentsProps } from './Types/investmentsProps';

const Investment = ({
  addInvestment,
  authUser,
  currentUser,
}: InvestmentsProps): JSX.Element => {
  const [formInvestment, setFormInvestment] = useState({
    name: '',
    amount: 0,
    category: '',
  });

  const { investAmount } = currentUser;

  const handleChange = (
    e: FormEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target as HTMLInputElement;
    setFormInvestment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlaAddInvestment = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    e.preventDefault();
    if (formInvestment.name.length) {
      const newInvestment = {
        ...formInvestment,
        uid: nanoid(),
        userId: authUser.uid,
        date: new Date().toString(),
      };
      addInvestment(newInvestment, investAmount);
    }
  };

  return (
    <form className="border p-6">
      <input
        type="text"
        name="name"
        placeholder="investment name"
        className="border"
        value={formInvestment.name}
        onChange={handleChange}
      />
      <br />
      <input
        type="number"
        name="amount"
        value={formInvestment.amount}
        onChange={handleChange}
      />
      <br />
      <select
        name="category"
        value={formInvestment.category}
        onChange={handleChange}
      >
        <option value="">--Please choose a category--</option>
        <option value="expense">crypto</option>
        <option value="income">other</option>
      </select>
      <br />
      <button type="submit" onClick={(e) => handlaAddInvestment(e)}>
        add
      </button>
    </form>
  );
};

export const InvestmentStore = (): JSX.Element => {
  const addInvestment = useStore((state) => state.addInvestment);
  const authUser = useStore((state) => state.authUser);
  const currentUser = useStore((state) => state.currentUser);
  return (
    <Investment
      addInvestment={addInvestment}
      authUser={authUser}
      currentUser={currentUser}
    />
  );
};
