import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Todo {
    id: ID!
    text: String!
    completed: Boolean!
  }

  type Query {
    todo(id: ID!): Todo
    todos: [Todo]!
    search(filter: String!): [Todo]!
  }

  type Mutation {
    addTodo(text: String!): [Todo!]!
    completeTodo(id: ID!): [Todo]!
    deleteTodo(id: ID!): [Todo]!
  }
`;

export default typeDefs;
