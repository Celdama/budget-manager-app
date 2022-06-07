import { Route, Routes } from 'react-router-dom';

import { RegisterGoogleStore } from '../components/RegisterGoogle';
import { TransactionsStore } from '../components/Transactions';
import { DashboardStore } from '../layouts/Dashboard';

export const Router = (): JSX.Element => (
  <Routes>
    <Route path="/" element={<DashboardStore />} />
    <Route path="/transactions" element={<TransactionsStore />} />
    <Route path="/google" element={<RegisterGoogleStore />} />
  </Routes>
);
