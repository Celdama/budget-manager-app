/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import { Todo } from '../model/Todo';
import {
  addTodoToFirebase,
  deleteTodoFromFirebase,
  getTodosFromFirebase,
  toggleCompleteTodoToFirebase,
} from './firebase/callFirebase';
import { NamedSetState } from './middlewares/middleware';
import { MyState } from './useStore.js';

export interface TodoSlice {
  todos: Todo[];
  addTodo: (newTodo: Todo) => void;
  deleteTodo: (deleteId: string) => void;
  getTodos: () => void;
  toggleComplete: (toggledTodo: Todo) => void;
}

const createTodoSlice = (
  set: NamedSetState<MyState>,
  get: NamedSetState<MyState>,
) => ({
  todos: [],
  addTodo: async (newTodo: Todo) => {
    await addTodoToFirebase(newTodo);
    set(({ todos }) => ({ todos: [...todos, newTodo] }), false, 'todos.addTodo');
  },
  deleteTodo: async (deleteId: string) => {
    await deleteTodoFromFirebase(deleteId);
    set(
      ({ todos }) => ({
        todos: todos.filter(({ id }) => id !== deleteId),
      }),
      false,
      'todos.deleteTodo',
    );
  },
  getTodos: async () => {
    const res = await getTodosFromFirebase();
    set({ todos: res }, false, 'todos.getTodos');
  },
  toggleComplete: async (updateTodo: Todo) => {
    await toggleCompleteTodoToFirebase(updateTodo);
    set(
      ({ todos }) => ({
        todos: todos.map((todo) => (todo.id === updateTodo.id
          ? { ...todo, completed: !updateTodo.completed }
          : todo)),
      }),
      false,
      'todos.toggleComplete',
    );
  },
});

export default createTodoSlice;
