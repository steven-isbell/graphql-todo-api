import { GraphQLServer } from 'graphql-yoga';
import session from 'express-session';
import dotenv from 'dotenv';

import resolvers from './resolvers';

dotenv.config();

const options = {
  port: 3001,
  endpoint: '/graphql',
  playground: '/graphiql',
  cors: {
    credentials: true
  }
};

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: req => ({
    ...req.request
  })
});

const secret = process.env.SESSION_SECRET || 'abcd';

server.express.use(
  session({
    secret,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 86400000
    }
  })
);

server.start(options, () =>
  console.log(`Server is running on localhost:${options.port}`)
);
