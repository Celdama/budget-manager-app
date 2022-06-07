import { isToday, toDate } from 'date-fns';
import { TransactionsListProps } from './Types/transactionsListProps';
import { TransactionItem } from '../TransactionItem';

export const TransactionsList = ({ transactions }: TransactionsListProps): JSX.Element => {
  const todayTransactions = transactions.filter((transaction) => isToday(toDate(Date.parse(transaction.date))));
  const olderTransactions = transactions.filter((transaction) => !isToday(toDate(Date.parse(transaction.date))));

  return (
    <>
      <h4>Recent Transactions</h4>
      <h5 className="text-sm italic text-gray-400">Today</h5>
      {todayTransactions.map(
        (transaction) => <TransactionItem key={transaction.uid} transaction={transaction} />,
      )}
      <h5 className="text-sm italic text-gray-400">Earlier</h5>
      {olderTransactions.map(
        (transaction) => <TransactionItem key={transaction.uid} transaction={transaction} />,
      )}
    </>
  );
};
