import { auth, getSession } from '@/lib/auth';
import { toNextJsHandler } from "better-auth/next-js"
import arcjet, {
  BotOptions,
  detectBot,
  EmailOptions,
  protectSignup,
  shield,
  slidingWindow,
  SlidingWindowRateLimitOptions,
} from "@arcjet/next"
import { env } from '@/data/env/server';

const aj = arcjet({
  key: env.ARCJET_KEY!,
  characteristics: ["userId"],
  rules: [shield({ mode: "LIVE" })],
})

const botSettings = {
  mode: "LIVE",
  allow: [],
} satisfies BotOptions
const restrictiveRateLimitSettings = {
  mode: "LIVE",
  max: 10,
  interval: "10m",
} satisfies SlidingWindowRateLimitOptions<[]>
const laxRateLimitSettings = {
  mode: "LIVE",
  max: 60,
  interval: "1m",
} satisfies SlidingWindowRateLimitOptions<[]>
const emailSettings = {
  mode: "LIVE",
  block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
} satisfies EmailOptions

const authHandlers = toNextJsHandler(auth)
export const { GET } = authHandlers

export async function POST(request: Request) {
  const clonedRequest = request.clone()
  const decision = await checkArcjet(request)

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return new Response(null, { status: 429 })
    } else if (decision.reason.isEmail()) {
      let message: string

      if (decision.reason.emailTypes.includes("INVALID")) {
        message = "Email address format is invalid."
      } else if (decision.reason.emailTypes.includes("DISPOSABLE")) {
        message = "Disposable email addresses are not allowed."
      } else if (decision.reason.emailTypes.includes("NO_MX_RECORDS")) {
        message = "Email domain is not valid."
      } else {
        message = "Invalid email."
      }

      return Response.json({ message }, { status: 400 })
    } else {
      return new Response(null, { status: 403 })
    }
  }

  return authHandlers.POST(clonedRequest)
}

async function checkArcjet(request: Request) {
  const body = (await request.json()) as unknown
  const session = await getSession();
  const userId = session?.user.id  || "127.0.0.1";

  if (request.url.endsWith("/auth/sign-up/email")) {
    if (
      body &&
      typeof body === "object" &&
      "email" in body &&
      typeof body.email === "string"
    ) {
      return aj
        .withRule(
          protectSignup({
            email: emailSettings,
            bots: botSettings,
            rateLimit: restrictiveRateLimitSettings,
          })
        )
        .protect(request, { email: body.email, userId })
    } else {
      return aj
        .withRule(detectBot(botSettings))
        .withRule(slidingWindow(restrictiveRateLimitSettings))
        .protect(request, { userId })
    }
  }

  return aj
    .withRule(detectBot(botSettings))
    .withRule(slidingWindow(laxRateLimitSettings))
    .protect(request, { userId })
}

