import Context from '../types/Context';
import Todo from '../types/Todo';

const uid = () => {
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

// compilation fails if typing properies on objects
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/21359
const addTodo = (_: object, args: any, ctx: Context): Todo[] => {
  console.log(ctx.session);
  const {
    session: { todos }
  } = ctx;
  const id = uid();
  const todo: Todo = {
    id,
    text: args.text,
    completed: false
  };

  todos.push(todo);

  return ctx.session.todos;
};

const completeTodo = (_: object, args: any, ctx: Context): Todo[] => {
  const item: Todo | undefined = ctx.session.todos.find(
    (item: Todo) => item.id === args.id
  );

  if (!item) {
    throw new Error(`No Item Matching ID: ${args.id}`);
  }

  item.completed = !item.completed;

  return ctx.session.todos;
};

const deleteTodo = (_: object, args: any, ctx: Context): Todo[] => {
  const {
    session: { todos }
  } = ctx;
  for (let i: number = todos.length - 1; i >= 0; i--) {
    if (todos[i].id === args.id) {
      todos.splice(i, 1);
    }
  }
  return todos;
};

const Mutation = {
  addTodo,
  completeTodo,
  deleteTodo
};

export default Mutation;
