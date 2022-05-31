import { Route, Routes } from 'react-router-dom';

import { RegisterGoogleStore } from '../components/RegisterGoogle';
import Transactions from '../components/Transactions';
import { Home } from '../pages/Home';

export const Router = (): JSX.Element => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/transactions" element={<Transactions />} />
    <Route path="/google" element={<RegisterGoogleStore />} />
  </Routes>
);
