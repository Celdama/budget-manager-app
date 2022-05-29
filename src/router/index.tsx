import { Route, Routes } from 'react-router-dom';

import { RegisterGoogle } from '../components/RegisterGoogle';
import Transactions from '../components/Transactions';
import { Home } from '../pages/Home';

// import { RegisterGoogle } from '../components/RegisterGoogle';
export const Router = (): JSX.Element => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/transactions" element={<Transactions />} />
    {/* <Route path="/register" element={<Register />} /> */}
    {/* <Route path="/signin" element={<Signin />} /> */}
    <Route path="/google" element={<RegisterGoogle />} />
  </Routes>
);
