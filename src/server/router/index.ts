// src/server/router/index.ts
import { createRouter } from "../createRouter";
import superjson from "superjson";

import { exampleRouter } from "./example.router";
import { userRouter } from "./user.router";
import { postRouter } from "./post.router";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("user.", userRouter)
  .merge("post.", postRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
