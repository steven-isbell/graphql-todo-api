import todoItems from '../models/todos';
import { Todo } from '../types';

let id = 1;

// compilation fails if typing properies on objects
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/21359
const addTodo = (_: object, args: any): Todo[] => {
  id++;
  const todo = {
    id,
    text: args.text,
    completed: false
  };
  todoItems.push(todo);

  return todoItems;
};

const completeTodo = (_: object, args: any): string => {
  const item = todoItems.find(item => item.id === args.id);
  if (!item) {
    throw new Error(`No Item Matching ID: ${args.id}`);
  }
  item.completed = true;

  return `${item.text} has been completed!`;
};

const Mutation = {
  addTodo,
  completeTodo
};

export default Mutation;
