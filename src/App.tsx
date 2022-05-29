import { useEffect } from 'react';

import { Router } from './router';
import useStore from './store/useStore';

const App = (): JSX.Element => {
  const getAuthUser = useStore(
    ({ getAuthUser }) => getAuthUser,
  );

  useEffect(() => {
    getAuthUser();
  }, []);

  return (
    <div className="App">
      <Router />
    </div>
  );
};

export default App;
