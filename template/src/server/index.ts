import { router } from "./trpc";
import { postsRouter } from "./routers/posts";
import { usersRouter } from "./routers/users";
import { aiRouter } from "./routers/ai";

// main application router combining all individual routers
export const appRouter = router({
  // example routers
  posts: postsRouter,
  users: usersRouter,
  // ai router
  ai: aiRouter,
});

// export the type definition of the app router
export type AppRouter = typeof appRouter;
