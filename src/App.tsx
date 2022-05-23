import { ReactElement } from 'react';

import TestComponent from './components/TestComponent';
import { TestLog } from './components/TestLog';

const App = (): ReactElement => (
  <div className="App">
    <h1>Budget Manager App</h1>
    <TestComponent />
    <br />
    <br />
    <br />
    <TestLog />
  </div>
);

export default App;
