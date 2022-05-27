import { Route, Routes } from 'react-router-dom';

import { Register } from '../components/Register';
import Signin from '../components/Signin';
import Transactions from '../components/Transactions';
import { Home } from '../pages/Home';

export const Router = (): JSX.Element => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/transactions" element={<Transactions />} />
    <Route path="/register" element={<Register />} />
    <Route path="/signin" element={<Signin />} />
  </Routes>
);
