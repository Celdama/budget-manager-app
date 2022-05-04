import { MouseEvent, ReactElement, useState } from 'react';

import { useStore } from '../../store';
import { Wrapper } from './testComponent.tw';

const TestComponent = (): ReactElement => {
  const [todoTitle, setTodoTitle] = useState('');
  const { todos, addTodo, deleteTodo } = useStore();

  const handleAddTodo = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (todoTitle.length) {
      addTodo(todoTitle);
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
          <li key={todo.id}>
            {todo.description}
            <button
              className="text-red-500 ml-6"
              type="button"
              onClick={() => deleteTodo(todo.id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};

export default TestComponent;
