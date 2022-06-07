import { TransactionItemProps } from './Types/transactionItemProps';

export const TransactionItem = ({
  transaction,
}: TransactionItemProps): JSX.Element => (
  <p>
    {transaction.name}
    {' '}
    - $
    {transaction.amount}
  </p>
);
