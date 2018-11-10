import todoItems from '../models/todos';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const todo = (_: object, { id }: { id: number }): Todo => {
  const item = todoItems.find(todo => todo.id === id);

  if (!item) throw new Error(`No Item Matching ID: ${id}`);
  return item;
};

const todos = (_: object, { id }: { id: number }): Object[] => {
  return [...todoItems];
};

const Query = {
  todo,
  todos
};

export default Query;
