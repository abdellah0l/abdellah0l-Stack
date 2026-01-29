import { env } from "../data/env/server";
import { drizzle } from "drizzle-orm/node-postgres";
import { schema } from "./schema";

// the main database instance u will use throughout your app
export const db = drizzle(env.DATABASE_URL, { schema });
