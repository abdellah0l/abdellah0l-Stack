import { initTRPC, TRPCError } from '@trpc/server';
import { getSession } from '@/lib/auth';
import { aj } from '@/lib/arcjet';

// create the tRPC context which includes session data and request info
export const createTRPCContext = async (opts: { req: Request }) => {
  const session = await getSession();
  return {
    session,
    req: opts.req,
    arcjet: aj,
  };
};

// initialize tRPC with the created context
const t = initTRPC.context<typeof createTRPCContext>().create();

// create the main router and procedures for tRPC
export const router = t.router;

// public procedure that does not require authentication
export const publicProcedure = t.procedure;

// protected procedure that requires the user to be logged in
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ 
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this feature.'
    });
  }

  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});