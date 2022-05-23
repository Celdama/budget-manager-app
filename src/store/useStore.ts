import create from 'zustand';
import { devtools } from 'zustand/middleware';

import createAuthUserSlice, { AuthUserSlice } from './createAuthSlice';
import createTransactionSlice, { TransactionSlice } from './createTransactionSlice';
import createUserSlice, { UserSlice } from './createUserSlice';

export type MyState = UserSlice & TransactionSlice & AuthUserSlice;

const useStore = create<MyState>()(
  devtools((set, get) => ({
    ...createUserSlice(set, get),
    ...createTransactionSlice(set, get),
    ...createAuthUserSlice(set, get),
  })),
);

export default useStore;
