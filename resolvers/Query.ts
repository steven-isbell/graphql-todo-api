import todoItems from '../models/todos';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const todo = (_: object, { id }: { id: number }): Todo => {
  const item = todoItems.find(todo => todo.id === +id);
  if (item) return item;
  else throw new Error(`No Item Matching ID: ${id}`);
};

const todos = (_: object, { id }: { id: number }): Object[] => {
  return [...todoItems];
};

const Query = {
  todo,
  todos
};

export default Query;
