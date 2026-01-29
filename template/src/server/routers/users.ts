import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { db } from "@/drizzle/db";
import { user } from "@/drizzle/schema/auth-schema";
import { eq } from "drizzle-orm";

// this is an example router file for managing users
// the ctx in protectedProcedure contains the authenticated user's session info
// and the input is actually a parameter passed to the procedure from the client-side

export const usersRouter = router({
  // Get current user profile
  me: protectedProcedure.query(async ({ ctx }) => {
    const [profile] = await db
      .select()
      .from(user)
      .where(eq(user.id, ctx.user.id));
    return profile ?? null;
  }),

  // Get user by ID (public)
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [profile] = await db
        .select({
          id: user.id,
          name: user.name,
          image: user.image,
          createdAt: user.createdAt,
        })
        .from(user)
        .where(eq(user.id, input.id));
      return profile ?? null;
    }),

  // Update current user profile
  update: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(100).optional(),
        image: z.string().url().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [updated] = await db
        .update(user)
        .set({
          ...(input.name && { name: input.name }),
          ...(input.image && { image: input.image }),
        })
        .where(eq(user.id, ctx.user.id))
        .returning();
      return updated;
    }),
});
