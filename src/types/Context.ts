import Todo from './Todo';

type Context = {
  sessionID: string;
  session: {
    todos: Todo[];
  };
};

export default Context;
