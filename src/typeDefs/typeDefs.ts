import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Todo {
    id: String!
    text: String!
    completed: Boolean!
  }

  type Query {
    todo(id: String!): Todo
    todos: [Todo]!
    search(filter: String!): [Todo]!
  }

  type Mutation {
    addTodo(text: String!): [Todo!]!
    completeTodo(id: String!): [Todo]!
    deleteTodo(id: String!): [Todo]!
  }
`;

export default typeDefs;
