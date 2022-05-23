import create from 'zustand';
import { devtools } from 'zustand/middleware';

import createTransactionSlice, { TransactionSlice } from './createTransactionSlice';
import createUserSlice, { UserSlice } from './createUserSlice';

export type MyState = UserSlice & TransactionSlice;

const useStore = create<MyState>()(
  devtools((set, get) => ({
    ...createUserSlice(set, get),
    ...createTransactionSlice(set, get),
  })),
);

export default useStore;
