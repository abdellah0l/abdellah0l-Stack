# My App

A modern full-stack application built with:

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **tRPC** - End-to-end type-safe APIs
- **Drizzle ORM** - Type-safe database queries
- **PostgreSQL** - Database (Neon recommended)
- **Better-Auth** - Authentication (GitHub, Google, Email)
- **Arcjet** - Rate limiting and security
- **Tailwind CSS** - Styling
- **Vercel AI SDK** - AI features (optional)
- **UploadThing** - File uploads (optional)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up your environment variables (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

3. Push the database schema:
   ```bash
   npm run db:push
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `BETTER_AUTH_SECRET` | Secret for auth (generate with `openssl rand -base64 32`) |
| `BETTER_AUTH_URL` | Your app URL |
| `GITHUB_CLIENT_ID` | GitHub OAuth app client ID |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth app client secret |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `ARCJET_KEY` | Arcjet API key |
| `AI_GATEWAY_API_KEY` | Vercel-ai API key (for AI features) |
| `UPLOADTHING_TOKEN` | UploadThing token (for file uploads) |

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Push schema to database
- `npm run db:generate` - Generate migrations
- `npm run db:migrate` - Run migrations
- `npm run db:studio` - Open Drizzle Studio
