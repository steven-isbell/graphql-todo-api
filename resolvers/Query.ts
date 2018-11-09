import todos from '../models/todos';

const todo = (_: object, { id }: { id: number }) => {
  return todos.find(todo => todo.id === +id);
};

const Query = {
  todo
};

export default Query;
