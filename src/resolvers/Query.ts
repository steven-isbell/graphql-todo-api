import Todo from '../types/Todo';

const todoItems: Todo[] = [];

// compilation fails if typing properies on objects
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/21359
const todo = (_: object, args: any): Todo => {
  const item = todoItems.find((todo: Todo) => todo.id === +args.id);

  if (!item) throw new Error(`No Item Matching ID: ${args.id}`);
  return item;
};

const todos = (): Todo[] => {
  return [...todoItems];
};

const search = (_: object, args: any): Todo[] => {
  const items = todoItems.filter((item: Todo) =>
    item.text.includes(args.filter)
  );

  return items;
};

const Query = {
  todo,
  todos,
  search
};

export default Query;
