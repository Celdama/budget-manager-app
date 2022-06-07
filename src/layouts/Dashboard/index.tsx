import { TransactionsListStore } from '../../components/TransactionsList';
import useStore from '../../store/useStore';
import { DashboardProps } from './Types/dashboardProps';

export const Dashboard = ({ authUser, getTransactions, transactions }: DashboardProps): JSX.Element => {
  console.log('test');
  return (
    <div className="parent">
      <div className="div1 text-white p-4">
        DASHBOARD + NAVBAR
      </div>
      <div className="div2 text-white p-4">
        LOGIN / LOGOUT
      </div>
      <div className="div3 text-white p-4">
        RESUME
      </div>
      <div className="div4 text-white p-4">
        BIG CHART
      </div>
      <div className="div5 text-white p-4">
        MY CARD
      </div>
      <div className="div6 text-white p-4">DEPOSIT</div>
      <div className="div7 text-white p-4">INVESTMENT</div>
      <div className="div8 text-white p-4"><TransactionsListStore /></div>
    </div>
  );
};

export const DashboardStore = (): JSX.Element => {
  const authUser = useStore((state) => state.authUser);
  const getTransactions = useStore((state) => state.getTransactions);
  const transactions = useStore((state) => state.transactions);

  return (
    <Dashboard
      authUser={authUser}
      getTransactions={getTransactions}
      transactions={transactions}
    />
  );
};
