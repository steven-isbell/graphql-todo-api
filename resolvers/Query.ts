import todoItems from '../models/todos';
import { Todo } from '../types';

// compilation fails if typing properies on objects
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/21359
const todo = (_: object, args: any): Todo => {
  const item = todoItems.find(todo => todo.id === args.id);

  if (!item) throw new Error(`No Item Matching ID: ${args.id}`);
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
