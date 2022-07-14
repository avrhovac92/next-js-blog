// src/server/router/index.ts
import { createRouter } from '../createRouter';
import superjson from 'superjson';

import { userRouter } from './user.router';
import { postRouter } from './post.router';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('user.', userRouter)
  .merge('post.', postRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
