import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { generateObject, generateText } from "ai" // example imports from Vercel AI SDK

// generateObject lets u create structured data based on a schema, while generateText is for free-form text generation

// ofc there's more of... like streamobjects/streamText for real-time generation, or using different models
// but this is just a basic example to show how u can integrate the Vercel AI SDK into ur tRPC router!


// this is an example router file for AI-related endpoints, using the Vercel AI SDK
export const aiRouter = router({
    // example usage of vercel ai sdk (generateText) to create a text summary endpoint
    textSummary: publicProcedure
        .input(z.object({ prompt: z.string().min(1) }))
        .mutation(async ({ input }) => {
            // use the generateText function to create a summary of the input text
            const { text }: { text: string } = await generateText({
                model: "anthropic/claude-sonnet-4.5", // specify the model to use
                input: `Summarize the following text:\n\n${input.prompt}`,
            });
            return { summary: text };
        }
    ),

    // example usage of vercel ai sdk (generateObject) to create a structured data generation endpoint
    generateProfile: publicProcedure
        .input(z.object({ name: z.string().min(1) }))
        .mutation(async ({ input }) => {
            // use the generateObject function to create a fake user profile by the model based on the input name
            const profile: {
                name: string;
                age: number;
                bio: string;
            } = await generateObject({
                model: "anthropic/claude-sonnet-4.5",
                schema: z.object({
                    name: z.string(),
                    age: z.number(),
                    bio: z.string(),
                }), // define the expected structure of the generated object
                input: `Generate a user profile for a person named ${input.name}`,
            });
            return profile;
        }),
})