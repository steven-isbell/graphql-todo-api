import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import compression from 'compression';
import connect from 'connect-redis';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';

import resolvers from './resolvers';
import typeDefs from './typeDefs/typeDefs';
import './connectRedisClient';

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
  SESSION_SECRET = '',
  REDIS_HOST = 'localhost',
  SERVER_PORT = 3001
} = process.env;

const RedisStore = connect(session);

const app = express();

app.use(cors({ credentials: true }));
app.use(helmet());
app.use(compression());
app.use(
  session({
    name: 'todo-id',
    store: new RedisStore({
      host: REDIS_HOST
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

app.use((req: any, _: any, next: Function) => {
  if (req.session.todos) next();
  else {
    req.session.todos = [];
    next();
  }
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen(SERVER_PORT, () =>
  console.log(`Server is running on PORT: ${SERVER_PORT}`)
);
