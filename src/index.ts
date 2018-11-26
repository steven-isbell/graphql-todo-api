import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import session from 'express-session';
import connect from 'connect-redis';

import resolvers from './resolvers';
import typeDefs from './typeDefs/typeDefs';

import client from './utils/client';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const schema = makeExecutableSchema({ resolvers, typeDefs });

const server = new ApolloServer({
  schema,
  context: ({ req }: { req: object }) => ({
    ...req
  }),
  playground: {
    settings: {
      'general.betaUpdates': false,
      'request.credentials': 'include',
      'editor.theme': 'dark',
      'editor.reuseHeaders': true,
      'tracing.hideTracingResponse': true,
      'editor.fontSize': 16,
      'editor.fontFamily': `'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace`
    }
  }
});

const {
  SESSION_SECRET = 'abcd',
  REDIS_HOST = 'localhost',
  REDIS_PORT = 6379
} = process.env;
const RedisStore = connect(session);

const app = express();
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));
app.use(helmet());
app.use(compression());
app.use(
  session({
    name: 'todo-id',
    store: new RedisStore({
      host: REDIS_HOST,
      port: +REDIS_PORT,
      client
    }),
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 86400000,
      httpOnly: true
    }
  })
);
app.use((req: any, _: any, next: any) => {
  if (req.session.todos) next();
  else {
    req.session.todos = [];
    next();
  }
});

server.applyMiddleware({ app, path: '/graphql' });

const port = 3001;

app.listen(port, () => console.log(`Server is running on localhost:${port}`));
