import { Route, Routes } from 'react-router-dom';

import { RegisterGoogleStore } from '../components/RegisterGoogle';
import { TransactionsStore } from '../components/Transactions';
import { Dashboard } from '../layouts/Dashboard';

export const Router = (): JSX.Element => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/transactions" element={<TransactionsStore />} />
    <Route path="/google" element={<RegisterGoogleStore />} />
  </Routes>
);
