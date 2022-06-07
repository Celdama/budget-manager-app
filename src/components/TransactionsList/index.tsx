import { isToday, toDate } from 'date-fns';

import { TransactionItem } from '../TransactionItem';
import { TransactionsListProps } from './Types/transactionsListProps';

export const TransactionsList = ({
  transactions,
}: TransactionsListProps): JSX.Element => {
  const todayTransactions = transactions.filter(({ date }) => isToday(toDate(Date.parse(date))));
  const olderTransactions = transactions.filter(
    ({ date }) => !isToday(toDate(Date.parse(date))),
  );

  return (
    <>
      <h4>Recent Transactions</h4>
      <h5 className="text-sm italic text-gray-400">Today</h5>
      {todayTransactions.map((transaction) => (
        <TransactionItem key={transaction.uid} transaction={transaction} />
      ))}
      <h5 className="text-sm italic text-gray-400">Earlier</h5>
      {olderTransactions.map((transaction) => (
        <TransactionItem key={transaction.uid} transaction={transaction} />
      ))}
    </>
  );
};
