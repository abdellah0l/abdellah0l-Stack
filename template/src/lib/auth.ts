import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/drizzle/db";
import { nextCookies } from "better-auth/next-js";
import { headers } from "next/headers";

// authentication instance to be used in API routes and server-side functions
export const auth = betterAuth({
    basePath: "/api/v1/auth",
    database: drizzleAdapter(db, {
        provider: "pg",
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string || "",
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string || "",
        },
    },
    plugins: [nextCookies()],
});

// get full session data
export async function getSession() {
    try {
        const headersList = await headers();
        
        // Try to get session using the built-in better-auth session handling
        const session = await auth.api.getSession({
            headers: headersList,
        });
        
        return session;
    } catch (error) {
        console.error('Error getting session:', error);
        return null;
    }
}