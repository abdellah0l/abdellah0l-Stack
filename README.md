# abdellah0l-stack

A CLI to scaffold a modern full-stack Next.js project with:

- ⚡ **Next.js 16** with App Router
- 🔷 **TypeScript** 
- 🔗 **tRPC** + React Query for type-safe APIs
- 🗃️ **Drizzle ORM** + PostgreSQL (Neon)
- 🔐 **Better-Auth** (GitHub, Google, Email)
- 🛡️ **Arcjet** for rate limiting (optional)
- 🎨 **Tailwind CSS**
- 🤖 **Vercel AI SDK** for ai integration (optional)
- 📁 **UploadThing** for uploading files (optional)

## Usage

```bash
npx abdellah0l-stack my-app
```

Or install globally:

```bash
npm install -g abdellah0l-stack
abdellah0l-stack my-app
```

## After Scaffolding

```bash
cd my-app
npm install

# Set up your .env file with:
# - DATABASE_URL
# - BETTER_AUTH_SECRET
# - GITHUB_CLIENT_ID & GITHUB_CLIENT_SECRET
# - GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET
# - ARCJET_KEY
# - AI_GATEWAY_API_KEY (if using AI)
# - UPLOADTHING_TOKEN (if using uploads)

npm run db:push
npm run dev
```

## License

MIT
