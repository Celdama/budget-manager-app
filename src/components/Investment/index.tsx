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
  deleteInvestment,
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
  const { name, amount, category } = formInvestment;

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
    if (name.length) {
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

  const investmentsList = investments.map((investment) => {
    const { uid, name, amount } = investment;
    return (
      <div className="flex">
        <p key={uid}>
          {name}
          {' '}
          <span className="text-green-600">
            {`+${amount} $`}
          </span>
        </p>
        <button
          type="button"
          className="ml-4 border text-sm rounded-md"
          onClick={() => deleteInvestment(investment, investAmount)}
        >
          delete
        </button>
      </div>
    );
  });

  return (
    <>
      <form className="border p-6">
        <input
          type="text"
          name="name"
          placeholder="investment name"
          className="border"
          value={name}
          onChange={handleChange}
        />
        <br />
        <input
          type="number"
          name="amount"
          value={amount}
          onChange={handleChange}
        />
        <br />
        <select
          name="category"
          value={category}
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
      {investmentsList}
    </>

  );
};

export const InvestmentStore = (): JSX.Element => {
  const investments = useStore((state) => state.investments);
  const addInvestment = useStore((state) => state.addInvestment);
  const authUser = useStore((state) => state.authUser);
  const currentUser = useStore((state) => state.currentUser);
  const getInvestments = useStore((state) => state.getInvestments);
  const deleteInvestment = useStore((state) => state.deleteInvestment);
  return (
    <Investment
      investments={investments}
      addInvestment={addInvestment}
      getInvestments={getInvestments}
      authUser={authUser}
      currentUser={currentUser}
      deleteInvestment={deleteInvestment}
    />
  );
};
