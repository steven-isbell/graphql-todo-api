import { GraphQLServer } from 'graphql-yoga';

import resolvers from './resolvers';

const options = {
  port: 3001,
  endpoint: '/graphql',
  playground: '/graphiql'
};

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: req => ({
    ...req.request
  })
});

server.start(options, () =>
  console.log(`Server is running on localhost:${options.port}`)
);
