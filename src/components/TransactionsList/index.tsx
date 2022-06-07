import useStore from '../../store/useStore';
import { TransactionsListProps } from './Types/transactionsListProps';

const TransactionsList = ({ transactions }: TransactionsListProps): JSX.Element => {
  console.log(transactions);
  return (
    <div>test</div>);
};

export const TransactionsListStore = (): JSX.Element => {
  const transactions = useStore((state) => state.transactions);
  return (
    <TransactionsList transactions={transactions} />
  );
};
