import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-b from-zinc-900 to-black text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8">
          <h1 className="text-5xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Welcome to Abdellah0l-Stack
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            with Abdellah0l-Stack, you can quickly build modern full-stack
            applications with authentication, type-safe APIs, and a database
            ready to go.
          </p>

          <div className="flex gap-4 justify-center pt-8">
            <Link
              href="/auth"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
            >
              Get Started
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-medium transition-colors"
            >
              GitHub
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6 pt-16 max-w-4xl mx-auto">
            <div className="p-6 bg-zinc-800/50 rounded-xl border border-zinc-700">
              <h3 className="text-lg font-semibold mb-2">Type-Safe APIs</h3>
              <p className="text-zinc-400 text-sm">
                End-to-end type safety with tRPC and TypeScript.
              </p>
            </div>
            <div className="p-6 bg-zinc-800/50 rounded-xl border border-zinc-700">
              <h3 className="text-lg font-semibold mb-2">Authentication</h3>
              <p className="text-zinc-400 text-sm">
                GitHub, Google, and email auth with Better-Auth.
              </p>
            </div>
            <div className="p-6 bg-zinc-800/50 rounded-xl border border-zinc-700">
              <h3 className="text-lg font-semibold mb-2">Database Ready</h3>
              <p className="text-zinc-400 text-sm">
                PostgreSQL with Drizzle ORM for type-safe queries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
