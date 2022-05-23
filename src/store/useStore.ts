import create from 'zustand';
import { devtools } from 'zustand/middleware';

import createFilterSlice, { FilterSlice } from './createFilterSlice';
import createTodoSlice, { TodoSlice } from './createTodoSlice';
import createUserSlice, { UserSlice } from './createUserSlice';

export type MyState = TodoSlice & FilterSlice & UserSlice

const useStore = create<MyState>()(
  devtools((set, get) => ({
    ...createTodoSlice(set, get),
    ...createFilterSlice(set, get),
    ...createUserSlice(set, get),
  })),
);

export default useStore;
