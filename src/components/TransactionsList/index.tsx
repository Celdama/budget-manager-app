const TransactionsList = (): JSX.Element => {
  console.log('transactions list');
  return (
    <div>test</div>);
};

export const TransactionsListStore = (): JSX.Element => {
  console.log('from transactionsListStore');
  return (
    <TransactionsList />
  );
};
