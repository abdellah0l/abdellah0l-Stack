import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        ARCJET_KEY: z.string().optional(),
        DATABASE_URL: z.string().url(),
        AI_GATEWAY_API_KEY: z.string().min(1),
    }, // server-side environment variables
    emptyStringAsUndefined: true, // treat empty strings as undefined
    experimental__runtimeEnv: process.env, // use process.env at runtime
    skipValidation: false, // do not skip validation
});