import { ReactElement } from 'react';

import TestComponent from './components/TestComponent';

const App = (): ReactElement => (
  <div className="App">
    <h1>Budget Manager App</h1>
    <TestComponent />
  </div>
);

export default App;
