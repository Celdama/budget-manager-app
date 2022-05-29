import { useEffect } from 'react';

import { Router } from './router';
import useStore from './store/useStore';

const App = (): JSX.Element => {
  const monitorAuthState = useStore(
    ({ monitorAuthState }) => monitorAuthState,
  );

  useEffect(() => {
    monitorAuthState();
  }, []);

  return (
    <div className="App">
      <Router />
    </div>
  );
};

export default App;
