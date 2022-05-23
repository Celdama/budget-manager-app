import create from 'zustand';
import { devtools } from 'zustand/middleware';

import createFilterSlice, { FilterSlice } from './createFilterSlice';
import createUserSlice, { UserSlice } from './createUserSlice';

// import createTodoSlice, { TodoSlice } from './createTodoSlice';
export type MyState = FilterSlice & UserSlice

const useStore = create<MyState>()(
  devtools((set, get) => ({
    // ...createTodoSlice(set, get),
    ...createFilterSlice(set, get),
    ...createUserSlice(set, get),
  })),
);

export default useStore;
