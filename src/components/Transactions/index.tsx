/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable object-curly-newline */
// eslint-disable-next-line object-curly-newline
import { nanoid } from 'nanoid';
import { ChangeEvent, FormEvent, MouseEvent, ReactElement, useEffect, useState } from 'react';

import useStore from '../../store/useStore';
import { InvestmentStore } from '../Investment';
import { TransactionsProps } from './Types/transactionsProps';

const Transactions = ({
  addTransaction,
  getTransactions,
  deleteTransaction,
  setCurrentUser,
  authUser,
  transactions,
  currentUser,
}: TransactionsProps): JSX.Element => {
  const [formTransaction, setFormTransaction] = useState({
    name: '',
    amount: 0,
    category: '',
  });

  useEffect(() => {
    if (authUser.email) {
      getTransactions(authUser.uid);
      setCurrentUser(authUser.uid);
    }
  }, [authUser]);

  const { displayName, amount: currentUserAmount, investAmount, photoURL, email } = currentUser;
  const { name, amount, category } = formTransaction;

  const handleChange = (
    e: FormEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
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
      addTransaction(newTransaction, currentUserAmount);
      setFormTransaction({
        name: '',
        amount: 0,
        category: '',
      });
    }
  };

  const transactionsList = transactions.map((transaction) => {
    const { uid, name, category, amount } = transaction;
    return (
      <div className="flex">
        <p key={uid}>
          {name}
          {' '}
          <span
            className={`
            ${category === 'expense'
              ? 'text-red-600'
              : 'text-green-600'}`}
          >
            {`${category === 'expense' ? '-' : '+'} ${amount} $`}
          </span>
        </p>
        <button
          type="button"
          className="ml-4 border text-sm rounded-md"
          onClick={() => deleteTransaction(transaction, currentUserAmount)}
        >
          delete
        </button>
      </div>
    );
  });

  return (
    <div className="p-7">
      <h1>
        {`Hello ${displayName} from Google Auth`}
      </h1>
      <br />
      <img src={`${photoURL}`} alt="avatar" />
      <p>{`${email}`}</p>
      <br />
      <ul>
        <li>
          <span>amount</span>
          {' '}
          <span className={`${currentUserAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {currentUserAmount}
            $
          </span>
        </li>
        <li>
          <span>invest amount</span>
          {' '}
          <span className={`${investAmount >= 1 ? 'text-green-600' : 'text-red-600'}`}>
            {investAmount}
            $
          </span>
        </li>
        <li>
          <span>total amount</span>
          {' '}
          <span className={`${investAmount + currentUserAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {investAmount + currentUserAmount}
            $
          </span>
        </li>
      </ul>
      <h2 className="underline">
        add new transaction
      </h2>
      <form className="border p-6">
        <input
          type="text"
          name="name"
          placeholder="transaction name"
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
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <br />
        <button type="submit" onClick={(e) => handleAddTransaction(e)}>
          add
        </button>
      </form>
      <h2 className="underline">transactions List</h2>
      <div>
        {transactionsList}
      </div>
      <br />
      <h2 className="underline">add new invest</h2>
      <InvestmentStore />
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
  const currentUser = useStore((state) => state.currentUser);
  return (
    <Transactions
      addTransaction={addTransaction}
      getTransactions={getTransactions}
      deleteTransaction={deleteTransaction}
      authUser={authUser}
      transactions={transactions}
      setCurrentUser={setCurrentUser}
      currentUser={currentUser}
    />
  );
};
