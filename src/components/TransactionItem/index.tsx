import { Wrapper } from './transactionItem.style';
import { TransactionItemProps } from './Types/transactionItemProps';

export const TransactionItem = ({
  transaction,
}: TransactionItemProps): JSX.Element => {
  const date = new Date(transaction.date);
  const hours = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' });

  return (
    <Wrapper>
      <div className="left">
        <p>
          <span>
            {transaction.name}
          </span>
          <span>
            {hours}
          </span>
        </p>
      </div>
      <div className="right">
        <span>
          $
          {transaction.amount}
        </span>
      </div>
    </Wrapper>
  );
};
