/* eslint-disable import/extensions */
/* eslint-disable object-curly-newline */
// eslint-disable-next-line object-curly-newline
import { nanoid } from 'nanoid';
import { MouseEvent, ReactElement, useEffect, useState } from 'react';

import useStore from '../../store/useStore';
import { useTodosSelector } from '../../store/useTodoSelector';
import { Wrapper } from './testComponent.tw';

const TestComponent = (): ReactElement => {
  const [todoTitle, setTodoTitle] = useState('');
  const {
    addTodo,
    deleteTodo,
    getTodos,
    toggleComplete,
    filter,
    setFilter,
  } = useStore();

  useEffect(() => {
    getTodos();
  }, []);

  const todos = useTodosSelector();

  const handleAddTodo = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (todoTitle.length) {
      const newTodo = {
        id: nanoid(),
        description: todoTitle,
        completed: false,
      };
      addTodo(newTodo);
      setTodoTitle('');
    }
  };

  return (
    <Wrapper>
      from test component
      <br />
      <form>
        <input
          type="text"
          name="todoTitle"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
        />
        <button type="submit" onClick={(e) => handleAddTodo(e)}>
          add
        </button>
      </form>
      <br />
      <ul>
        {todos.map((todo) => (
          <li
            className={`${todo.completed ? 'line-through' : ''}`}
            key={todo.id}
          >
            {todo.description}
            <button
              className="text-red-500 border-2 mx-6"
              type="button"
              onClick={() => deleteTodo(todo.id)}
            >
              X
            </button>
            <button
              type="button"
              onClick={() => toggleComplete(todo)}
              className="border-2"
            >
              {todo.completed ? 'undone' : 'done'}
            </button>
          </li>
        ))}
      </ul>
      <br />
      <h3>Filter test</h3>
      <div>
        <button
          disabled={filter === null}
          type="button"
          className="bg-blue-300 disabled:bg-red-300 text-white py-2 px-4"
          onClick={() => setFilter(null)}
        >
          All
        </button>
        <button
          disabled={filter === false}
          type="button"
          className="bg-blue-300 disabled:bg-red-300 text-white py-2 px-4"
          onClick={() => setFilter(false)}
        >
          To Do
        </button>
        <button
          disabled={filter === true}
          type="button"
          className="bg-blue-300 disabled:bg-red-300 text-white py-2 px-4"
          onClick={() => setFilter(true)}
        >
          Done
        </button>
      </div>
    </Wrapper>
  );
};

export default TestComponent;
