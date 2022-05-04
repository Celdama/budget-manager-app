import { nanoid } from 'nanoid';
import create from 'zustand';

import { Todo } from './model/Todo';

interface TodoState {
  todos: Todo[],
  addTodo: (description: string) => void,
  deleteTodo: (id: string) => void
}

export const useStore = create<TodoState>((set) => ({
  todos: [],
  addTodo: (description: string) => {
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: nanoid(),
          description,
          completed: false,
        } as Todo,
      ],
    }));
  },
  deleteTodo: (id: string) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },
}));
