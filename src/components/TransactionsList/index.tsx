import useStore from '../../store/useStore';

const TransactionsList = ({ transactions }): JSX.Element => {
  console.log('transactions list');
  return (
    <div>test</div>);
};

export const TransactionsListStore = (): JSX.Element => {
  const transactions = useStore((state) => state.transactions);
  return (
    <TransactionsList transactions={transactions} />
  );
};
