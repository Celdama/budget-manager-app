import { Route, Routes } from 'react-router-dom';

import { TestLog } from './components/TestLog';
import TestSignIn from './components/TestSignIn';
import { Home } from './pages/Home';

const App = (): JSX.Element => (
  <div className="App">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<TestLog />} />
      <Route path="/signin" element={<TestSignIn />} />
    </Routes>
    {/* <TestComponent />
    <br />
    <br />
    <br />
    <TestLog />
    <br />
    <br />
    <br />
    <br />
    <TestSignIn /> */}
  </div>
);

export default App;
