import { isToday, isYesterday, toDate } from 'date-fns';

import { TransactionItem } from '../TransactionItem';
import { TransactionsListProps } from './Types/transactionsListProps';

export const TransactionsList = ({
  transactions,
}: TransactionsListProps): JSX.Element => {
  const todayTransactions = transactions.filter(({ date }) => isToday(toDate(Date.parse(date))));
  const yesterdayTransactions = transactions.filter(
    ({ date }) => isYesterday(toDate(Date.parse(date))),
  );

  return (
    <>
      <h4>Recent Transactions</h4>
      <h5 className="text-sm italic text-gray-400">Today</h5>
      {todayTransactions.length ? todayTransactions.map((transaction) => (
        <TransactionItem key={transaction.uid} transaction={transaction} />
      )) : <p>No transaction</p>}
      <h5 className="text-sm italic text-gray-400">Yesterday</h5>
      {yesterdayTransactions.length ? yesterdayTransactions.map((transaction) => (
        <TransactionItem key={transaction.uid} transaction={transaction} />
      )) : <p>No transaction</p>}
    </>
  );
};
