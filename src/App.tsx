import { ReactElement } from 'react';

import TestComponent from './components/TestComponent';
import { TestLog } from './components/TestLog';
import TestSignIn from './components/TestSignIn';

const App = (): ReactElement => (
  <div className="App">
    <h1>Budget Manager App</h1>
    <TestComponent />
    <br />
    <br />
    <br />
    <TestLog />
    <br />
    <br />
    <br />
    <br />
    <TestSignIn />
  </div>
);

export default App;
