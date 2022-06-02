import { NamedSetState } from '../middlewares/middleware';
import { MyState } from '../useStore';

export interface InvestmentSlice {
  investments: [],
}

const createInvestmentSlice = (
  set: NamedSetState<MyState>,
  get: NamedSetState<MyState>,
) => ({
  investments: [],
});

export default createInvestmentSlice;
