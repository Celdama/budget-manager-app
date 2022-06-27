import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { TransactionsList } from '../../components/TransactionsList';
import useStore from '../../store/useStore';
import { DashboardProps } from './Types/dashboardProps';

export const Dashboard = ({
  authUser,
  currentUser,
  getTransactions,
  setCurrentUser,
  transactions,
}: DashboardProps): JSX.Element => {
  useEffect(() => {
    if (authUser.email) {
      getTransactions(authUser.uid);
      setCurrentUser(authUser.uid);
    }
  }, [authUser]);

  console.log(transactions);

  return (
    <div className="parent">
      <div className="div1 text-white p-4">DASHBOARD + NAVBAR</div>
      <div className="div2 text-white p-4">
        LOGIN / LOGOUT
        <Link to="/google">Register</Link>
      </div>
      <div className="div3 text-white p-4">RESUME</div>
      <div className="div4 text-white p-4">BIG CHART</div>
      <div className="div5 text-white p-4">MY CARD</div>
      <div className="div6 text-white p-4">DEPOSIT</div>
      <div className="div7 text-white p-4">INVESTMENT</div>
      <div className="div8 text-white p-4">
        <TransactionsList transactions={transactions.slice(0, 6)} />
      </div>
    </div>
  );
};

export const DashboardStore = (): JSX.Element => {
  const authUser = useStore((state) => state.authUser);
  const currentUser = useStore((state) => state.currentUser);
  const getTransactions = useStore((state) => state.getTransactions);
  const transactions = useStore((state) => state.transactions);
  const setCurrentUser = useStore((state) => state.setCurrentUser);

  return (
    <Dashboard
      setCurrentUser={setCurrentUser}
      authUser={authUser}
      currentUser={currentUser}
      getTransactions={getTransactions}
      transactions={transactions}
    />
  );
};
