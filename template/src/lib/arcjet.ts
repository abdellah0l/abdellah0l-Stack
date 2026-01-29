import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/next";
import { env } from "@/data/env/server";

// initialize Arcjet with rules for security and rate limiting

const ARCJET_KEY = env.ARCJET_KEY!;
if (!ARCJET_KEY) {
  throw new Error("ARCJET_KEY environment variable is required");
}

// Arcjet instance to be used in API routes and server-side functions
export const aj = arcjet({
  key: ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }), // the job of this rule is to block malicious requests like SQLi, XSS, etc. (mode: "LIVE" means that it will actually block them)
    detectBot({
      mode: "LIVE", // mode: "LIVE" means that it will actually enforce the rate limit
      allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:PREVIEW"], // allow good bots like Googlebot
    }),
    slidingWindow({
      mode: "LIVE", // mode: "LIVE" means that it will actually enforce the rate limit
      interval: "1m", // 1 minute
      max: 50, // max 50 requests per interval
      characteristics: ["userId"], // identify users by their userId
    }), // this rule limits the number of requests to prevent abuse
  ],
});

// u can create more Arcjet instances with different rules if needed
// example: a stricter instance for pfp uploads
export function ProfilePhotoLimiter() {
  return arcjet({
    key: ARCJET_KEY,
    rules: [
      shield({ mode: "LIVE" }),
      slidingWindow({
        mode: "LIVE", 
        interval: "7d",
        max: 2, 
        characteristics: ["userId"], 
      }), 
    ],
  });
}

