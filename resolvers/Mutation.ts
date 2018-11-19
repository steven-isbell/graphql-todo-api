import todoItems from '../models/todos';
import { Todo } from '../types';
import client from '../client';

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

const completeTodo = (_: object, args: any): Todo[] => {
  const item = todoItems.find((item: Todo) => item.id === +args.id);

  if (!item) {
    throw new Error(`No Item Matching ID: ${args.id}`);
  }
  item.completed = !item.completed;

  return todoItems;
};

const deleteTodo = (_: object, args: any): Todo[] => {
  for (let i = todoItems.length - 1; i >= 0; i--) {
    if (todoItems[i].id === +args.id) {
      todoItems.splice(i, 1);
    }
  }
  return todoItems;
};

const Mutation = {
  addTodo,
  completeTodo,
  deleteTodo
};

export default Mutation;
