import { defineConfig } from "drizzle-kit";
import { env } from "@/data/env/server";

// Drizzle configuration for database migrations
// install the extension "Drizzle ORM" in VSCode for a better experience (schema visulalization, autocompletion, etc)
export default defineConfig({
    schema: "./src/drizzle/schema/index.ts",
    out: "./src/drizzle/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: env.DATABASE_URL,
    },
})