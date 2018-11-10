import todoItems from '../models/todos';
import { Todo } from '../types';

let id = 1;

const addTodo = (_: object, { text }: { text: string }): Todo[] => {
  id++;
  const todo = {
    id,
    text,
    completed: false
  };
  todoItems.push(todo);

  return todoItems;
};

const completeTodo = (_: object, { id }: { id: number }): string => {
  const item = todoItems.find(item => item.id === id);
  if (!item) {
    throw new Error(`No Item Matching ID: ${id}`);
  }
  item.completed = true;

  return `${item.text} has been completed!`;
};

const Mutation = {
  addTodo,
  completeTodo
};

export default Mutation;
