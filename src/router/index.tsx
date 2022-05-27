import { Route, Routes } from 'react-router-dom';

import { Register } from '../components/Register';
import Signin from '../components/Signin';
import TestComponent from '../components/TestComponent';
import { Home } from '../pages/Home';

export const Router = (): JSX.Element => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/transaction" element={<TestComponent />} />
    <Route path="/register" element={<Register />} />
    <Route path="/signin" element={<Signin />} />
  </Routes>
);
