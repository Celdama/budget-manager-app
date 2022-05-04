import { ReactElement } from 'react';

import useStore from '../../store';
import { Wrapper } from './testComponent.tw';

const TestComponent = (): ReactElement => {
  const bears = useStore((state) => state.bears);
  const increasePopulation = useStore((state) => state.increase);
  console.log(bears);
  return (
    <Wrapper>
      from test component
      <button
        type="button"
        className="border-2 bg-slate-700 text-white"
        onClick={() => increasePopulation(1)}
      >
        Increase
      </button>
    </Wrapper>
  );
};

export default TestComponent;
