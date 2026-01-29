import { createAuthClient } from "better-auth/react"

// authentication client to manage user sessions and auth state
export const authClient = createAuthClient({
    baseURL: "http://localhost:3000/api/auth",
});

