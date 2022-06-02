/* eslint-disable max-len */
import create from 'zustand';
import { devtools } from 'zustand/middleware';

import createAuthUserSlice, { AuthUserSlice } from './slices/createAuthSlice';
import createInvestmentSlice, { InvestmentSlice } from './slices/createInvestmentSlice';
import createTransactionSlice, { TransactionSlice } from './slices/createTransactionSlice';
import createUserSlice, { UserSlice } from './slices/createUserSlice';

export type MyState = UserSlice & TransactionSlice & AuthUserSlice & InvestmentSlice;

const useStore = create<MyState>()(
  devtools((set, get) => ({
    ...createUserSlice(set, get),
    ...createTransactionSlice(set, get),
    ...createAuthUserSlice(set, get),
    ...createInvestmentSlice(set, get),
  })),
);

export default useStore;
