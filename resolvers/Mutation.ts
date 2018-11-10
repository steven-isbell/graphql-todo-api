import todoItems from '../models/todos';
let id = 1;

const addTodo = (_: object, { text }: { text: string }) => {
  id++;
  const todo = {
    id,
    text,
    completed: false
  };
  todoItems.push(todo);

  return todoItems;
};

const completeTodo = (_: object, { id }: { id: number }) => {
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
