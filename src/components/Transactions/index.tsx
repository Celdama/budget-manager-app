/* eslint-disable import/extensions */
/* eslint-disable object-curly-newline */
// eslint-disable-next-line object-curly-newline
import { nanoid } from 'nanoid';
import { MouseEvent, ReactElement, useEffect, useState } from 'react';

import { Transaction } from '../../model/Transaction';
import useStore from '../../store/useStore';
import { TransactionsProps } from './Types/transactionsProps';

const Transactions = ({
  addTransaction,
  getTransactions,
  deleteTransaction,
  authUser,
  transactions,
}: TransactionsProps): JSX.Element => {
  const [formTransaction, setFormTransaction] = useState({
    name: '',
    amount: 0,
    category: '',
  });

  // console.log(authUser);

  useEffect(() => {
    if (authUser.email) {
      getTransactions(authUser.uid);
    }
  }, [authUser]);

  const handleChange = (
    e: React.FormEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target as HTMLInputElement;
    setFormTransaction((prevState) => ({
      ...prevState,
      [name]: name === 'amount' ? +value : value,
    }));
  };

  const handleAddTransaction = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (formTransaction.name.length) {
      const newTransaction = {
        ...formTransaction,
        uid: nanoid(),
        userId: authUser.uid,
        date: new Date().toString(),
      };
      addTransaction(newTransaction);
      setFormTransaction({
        name: '',
        amount: 0,
        category: '',
      });
    }
  };

  const transactionsList = transactions.map((transaction: Transaction) => (
    <p key={transaction.uid}>
      {transaction.name}
      {' '}
      -
      {' '}
      {transaction.amount}
      ------
      {' '}
      <button type="button" onClick={() => deleteTransaction(transaction)}>
        x
      </button>
    </p>
  ));

  return (
    <div>
      create transaction
      <h1>{`Hello ${authUser.displayName}`}</h1>
      <img src={`${authUser.photoURL}`} alt="avatar" />
      <p>{`${authUser.email}`}</p>
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
    </div>
  );
};

export const TransactionsStore = (): ReactElement => {
  const addTransaction = useStore((state) => state.addTransaction);
  const getTransactions = useStore((state) => state.getTransactions);
  const deleteTransaction = useStore((state) => state.deleteTransaction);
  const authUser = useStore((state) => state.authUser);
  const transactions = useStore((state) => state.transactions);
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  return (
    <Transactions
      addTransaction={addTransaction}
      getTransactions={getTransactions}
      deleteTransaction={deleteTransaction}
      authUser={authUser}
      transactions={transactions}
      setCurrentUser={setCurrentUser}
    />
  );
};
