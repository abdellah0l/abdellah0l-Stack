import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
    client: {}, // client-side environment variables
    emptyStringAsUndefined: true, // treat empty strings as undefined
    experimental__runtimeEnv: {} // no process.env on the client
});