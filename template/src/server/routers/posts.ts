import { z } from "zod";
import { router, protectedProcedure, publicProcedure } from "../trpc";
import { db } from "@/drizzle/db";
import { posts } from "@/drizzle/schema";
import { eq, desc } from "drizzle-orm";

// this is an example router file for managing blog posts

export const postsRouter = router({
  // Get all posts
  list: publicProcedure.query(async () => {
    return await db.select().from(posts).orderBy(desc(posts.createdAt));
  }),

  // Get single post by ID
  byId: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input }) => {
      const result = await db
        .select()
        .from(posts)
        .where(eq(posts.id, input.id));
      return result[0] ?? null;
    }),

  // Create a new post (protected)
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(255),
        content: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [post] = await db
        .insert(posts)
        .values({
          title: input.title,
          content: input.content,
          userId: ctx.user.id,
        })
        .returning();
      return post;
    }),

  // Update a post (protected, owner only)
  update: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        title: z.string().min(1).max(255).optional(),
        content: z.string().min(1).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [existing] = await db
        .select()
        .from(posts)
        .where(eq(posts.id, input.id));

      if (!existing || existing.userId !== ctx.user.id) {
        throw new Error("Not authorized");
      }

      const [updated] = await db
        .update(posts)
        .set({
          ...(input.title && { title: input.title }),
          ...(input.content && { content: input.content }),
        })
        .where(eq(posts.id, input.id))
        .returning();

      return updated;
    }),

  // Delete a post (protected, owner only)
  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const [existing] = await db
        .select()
        .from(posts)
        .where(eq(posts.id, input.id));

      if (!existing || existing.userId !== ctx.user.id) {
        throw new Error("Not authorized");
      }

      await db.delete(posts).where(eq(posts.id, input.id));
      return { success: true };
    }),
});
