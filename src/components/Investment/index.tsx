import { nanoid } from 'nanoid';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import useStore from '../../store/useStore';
import { InvestmentsProps } from './Types/investmentsProps';

const Investment = ({
  investments,
  getInvestments,
  addInvestment,
  authUser,
  currentUser,
}: InvestmentsProps): JSX.Element => {
  const [formInvestment, setFormInvestment] = useState({
    name: '',
    amount: 0,
    category: '',
  });

  useEffect(() => {
    if (authUser.displayName) {
      getInvestments(authUser.uid);
    }
  }, [authUser]);

  const { investAmount } = currentUser;

  const handleChange = (
    e: FormEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target as HTMLInputElement;
    setFormInvestment((prevState) => ({
      ...prevState,
      [name]: name === 'amount' ? +value : value,
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
      setFormInvestment({
        name: '',
        amount: 0,
        category: '',
      });
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
        <option value="crypto">crypto</option>
        <option value="other">other</option>
      </select>
      <br />
      <button type="submit" onClick={(e) => handlaAddInvestment(e)}>
        add
      </button>
    </form>
  );
};

export const InvestmentStore = (): JSX.Element => {
  const investments = useStore((state) => state.investments);
  const addInvestment = useStore((state) => state.addInvestment);
  const authUser = useStore((state) => state.authUser);
  const currentUser = useStore((state) => state.currentUser);
  const getInvestments = useStore((state) => state.getInvestments);
  return (
    <Investment
      addInvestment={addInvestment}
      getInvestments={getInvestments}
      authUser={authUser}
      currentUser={currentUser}
    />
  );
};
