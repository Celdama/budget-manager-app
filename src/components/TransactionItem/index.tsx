import { TransactionItemProps } from './Types/transactionItemProps';

export const TransactionItem = ({ transaction }: TransactionItemProps): JSX.Element => {
  console.log(transaction);
  return (
    <div>transaction item</div>
  );
};
