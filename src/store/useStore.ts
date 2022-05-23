import create from 'zustand';
import { devtools } from 'zustand/middleware';

import createUserSlice, { UserSlice } from './createUserSlice';

export type MyState = UserSlice

const useStore = create<MyState>()(
  devtools((set, get) => ({
    ...createUserSlice(set, get),
  })),
);

export default useStore;
