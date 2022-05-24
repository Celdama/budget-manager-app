/* eslint-disable import/extensions */
/* eslint-disable object-curly-newline */
// eslint-disable-next-line object-curly-newline
import { nanoid } from 'nanoid';
import { MouseEvent, useState } from 'react';

import { Transaction } from '../../model/Transaction';
import useStore from '../../store/useStore';
import { Wrapper } from './testComponent.tw';

const TestComponent = (): JSX.Element => {
  const addTransaction = useStore((state) => state.addTransaction);
  const transactions = useStore((state) => state.transactions);
  const [formTransaction, setFormTransaction] = useState({
    name: '',
    amount: 0,
    category: '',
  });

  const handleChange = (
    e: React.FormEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target as HTMLInputElement;
    setFormTransaction((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddTransaction = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (formTransaction.name.length) {
      const newTransaction = {
        ...formTransaction,
        uid: nanoid(),
        userId: 'OEcO44NJyZPqSaH52IpL',
        date: new Date().toString(),
      };
      // LE TRUC C4EST QUE MAINTENANT, JE VAIS DEVOIR TROUVER L'ID DE L'USER EN QUESTION
      // POUR LUI AJOUTER L'ID DE CETTE TRANSACTION DANS SON TABLEAU DE TRANSACTIONS
      addTransaction(newTransaction);
      setFormTransaction({
        name: '',
        amount: 0,
        category: '',
      });
    }
  };

  const transactionsList = transactions.map((transaction: Transaction) => (
    <p key={transaction.uid}>{transaction.name}</p>
  ));

  return (
    <Wrapper>
      create transaction
      <form>
        <input
          type="text"
          name="name"
          value={formTransaction.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="amount"
          value={formTransaction.amount}
          onChange={handleChange}
        />

        <select
          name="category"
          value={formTransaction.category}
          onChange={handleChange}
        >
          <option value="">--Please choose a category--</option>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <button type="submit" onClick={(e) => handleAddTransaction(e)}>
          add
        </button>
      </form>
      <h2>transactions List</h2>
      {transactionsList}
    </Wrapper>
  );
};

export default TestComponent;
