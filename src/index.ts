import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import session from 'express-session';

import resolvers from './resolvers';
import typeDefs from './typeDefs/typeDefs';

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

const secret = process.env.SESSION_SECRET || 'abcd';

const app = express();
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(
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

server.applyMiddleware({ app, path: '/graphql' });

const port = 3001;

app.listen(port, () => console.log(`Server is running on localhost:${port}`));
