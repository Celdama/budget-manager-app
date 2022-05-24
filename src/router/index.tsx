import { Route, Routes } from 'react-router-dom';

import TestComponent from '../components/TestComponent';
import { TestLog } from '../components/TestLog';
import TestSignIn from '../components/TestSignIn';
import { Home } from '../pages/Home';

export const Router = (): JSX.Element => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/transaction" element={<TestComponent />} />
    <Route path="/register" element={<TestLog />} />
    <Route path="/signin" element={<TestSignIn />} />
  </Routes>
);
