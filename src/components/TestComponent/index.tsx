/* eslint-disable import/extensions */
/* eslint-disable object-curly-newline */
// eslint-disable-next-line object-curly-newline
import { nanoid } from 'nanoid';
import { MouseEvent, ReactElement, useEffect, useState } from 'react';

import useStore from '../../store/useStore';
import { Wrapper } from './testComponent.tw';

const TestComponent = (): ReactElement => {
  const [transactionTitle, setTransactionTitle] = useState('');
  const { addTransaction } = useStore();

  const handleAddTransaction = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (transactionTitle.length) {
      const newTransaction = {
        amount: 400,
        category: 'expenses',
        date: new Date().toString(),
        name: transactionTitle,
        uid: nanoid(),
        userId: 'OEcO44NJyZPqSaH52IpL',
      };
      // LE TRUC C4EST QUE MAINTENANT, JE VAIS DEVOIR TROUVER L'ID DE L'USER EN QUESTION
      // POUR LUI AJOUTER L'ID DE CETTE TRANSACTION DANS SON TABLEAU DE TRANSACTIONS
      addTransaction(newTransaction);
      setTransactionTitle('');
    }
  };

  return (
    <Wrapper>
      create transaction
      <form>
        <input
          type="text"
          name="todoTitle"
          value={transactionTitle}
          onChange={(e) => setTransactionTitle(e.target.value)}
        />
        <button type="submit" onClick={(e) => handleAddTransaction(e)}>
          add
        </button>
      </form>
    </Wrapper>
  );
};

export default TestComponent;
