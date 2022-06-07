import { TransactionsListStore } from '../../components/TransactionsList';

export const Dashboard = (): JSX.Element => (
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

export const DashboardStore = (): JSX.Element => {
  console.log('dashboard');
  return (
    <Dashboard />
  );
};
