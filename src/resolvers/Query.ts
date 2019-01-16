import Context from '../types/Context';
import Todo from '../types/Todo';

// compilation fails if typing properies on objects
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/21359
const todo = (_: object, args: any, ctx: Context): Todo => {
  const item = ctx.session.todos.find((todo: Todo) => todo.id === args.id);

  if (!item) throw new Error(`No Item Matching ID: ${args.id}`);
  return item;
};

const todos = (_: object, __: any, ctx: Context): Todo[] => {
  return [...ctx.session.todos];
};

const search = (_: object, args: any, ctx: Context): Todo[] => {
  const items = ctx.session.todos.filter((item: Todo) =>
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
