import todoItems from '../models/todos';
import { Todo } from '../types';

const todo = (_: object, { id }: { id: number }): Todo => {
  const item = todoItems.find(todo => todo.id === id);

  if (!item) throw new Error(`No Item Matching ID: ${id}`);
  return item;
};

const todos = (): Todo[] => {
  return [...todoItems];
};

const Query = {
  todo,
  todos
};

export default Query;
