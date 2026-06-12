#!/usr/bin/env node

import path from "path";
import fs from "fs-extra";
import prompts from "prompts";
import chalk from "chalk";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log(chalk.blue.bold("\n🚀 abdellah0l-Stack - Next.js + tRPC + Drizzle + Better-Auth + Arcjet + TanStack Query \n"));
  console.log(chalk.gray("Thnx for using abdellah0l-Stack :) Let's build something awesome together.\n"));

  // Get project name from args or prompt
  let projectName = process.argv[2];

  if (!projectName) {
    const response = await prompts({
      type: "text",
      name: "projectName",
      message: "Project name:",
      initial: "my-app",
    });
    projectName = response.projectName;

    if (!projectName) {
      console.log(chalk.red("\n❌ Project name is required!\n"));
      process.exit(1);
    }
  }

  // Ask for additional options
  const options = await prompts([
    {
      type: "text",
      name: "description",
      message: "Project description:",
      initial: "A modern full-stack application",
    },
    {
      type: "confirm",
      name: "includeAI",
      message: "Include AI features (Vercel AI SDK)?",
      initial: true,
    },
    {
      type: "confirm",
      name: "includeUploadthing",
      message: "Include file uploads (UploadThing)?",
      initial: true,
    },
    {
      type: "confirm",
      name: "includeRateLimiting",
      message: "Include rate limiting (Arcjet)?",
      initial: true,
    },
    {
      type: "confirm",
      name: "includeTanstack",
      message: "Include TanStack Query (React Query)?",
      initial: true,
    }
  ]);

  const targetDir = path.resolve(process.cwd(), projectName);
  const templateDir = path.join(__dirname, "..", "template");

  // Check if directory exists
  if (fs.existsSync(targetDir)) {
    const { overwrite } = await prompts({
      type: "confirm",
      name: "overwrite",
      message: `Directory ${projectName} already exists. Overwrite?`,
      initial: false,
    });

    if (!overwrite) {
      console.log(chalk.yellow("\n⚠️  Operation cancelled.\n"));
      process.exit(0);
    }

    await fs.remove(targetDir);
  }

  console.log(chalk.yellow(`\n📁 Creating project in ${chalk.white(targetDir)}...\n`));

  // Copy template
  await fs.copy(templateDir, targetDir);

  // Rename gitignore -> .gitignore (npm strips .gitignore from published packages)
  const oldGitignore = path.join(targetDir, "gitignore");
  const newGitignore = path.join(targetDir, ".gitignore");
  if (fs.existsSync(oldGitignore)) {
    await fs.rename(oldGitignore, newGitignore);
  }

  // Update package.json with project name
  const pkgPath = path.join(targetDir, "package.json");
  if (fs.existsSync(pkgPath)) {
    const pkg = await fs.readJson(pkgPath);
    pkg.name = projectName;
    pkg.description = options.description || "";
    
    // Remove AI packages if not needed
    if (!options.includeAI && pkg.dependencies) {
      delete pkg.dependencies["@ai-sdk/anthropic"];
      delete pkg.dependencies["ai"];
    }
    
    // Remove uploadthing if not needed
    if (!options.includeUploadthing && pkg.dependencies) {
      delete pkg.dependencies["uploadthing"];
      delete pkg.dependencies["@uploadthing/react"];
    }

    // Remove arcjet if not needed
    if (!options.includeRateLimiting && pkg.dependencies) {
      delete pkg.dependencies["@arcjet/next"];
      delete pkg.dependencies["arcjet"];
    }

    // Remove TanStack Query if not needed
    if (!options.includeTanstack && pkg.dependencies) {
      delete pkg.dependencies["@tanstack/react-query"];
      delete pkg.dependencies["@tanstack/react-query-devtools"];
    }
    
    await fs.writeJson(pkgPath, pkg, { spaces: 2 });
  }

  // Create .env from .env.example
  const envExample = path.join(targetDir, ".env.example");
  const envFile = path.join(targetDir, ".env");
  if (fs.existsSync(envExample)) {
    await fs.copy(envExample, envFile);
  }

  // Remove AI files if not needed
  if (!options.includeAI) {
    const aiPaths = [
      path.join(targetDir, "src", "app", "api", "v1", "ai"),
      path.join(targetDir, "src", "modules", "ai"),
      path.join(targetDir, "src", "lib", "ai-schemas.ts"),
      path.join(targetDir, "src", "components", "ai-error-boundary.tsx"),
      path.join(targetDir, "src", "components", "ai-loading-spinner.tsx"),
      path.join(targetDir, "src", "components", "ai-recommendations.tsx"),
      path.join(targetDir, "src", "components", "ai-summary.tsx"),
      path.join(targetDir, "src", "components", "exploreAi.tsx"),
    ];
    for (const p of aiPaths) {
      await fs.remove(p).catch(() => {});
    }
  }

  // Remove uploadthing files if not needed
  if (!options.includeUploadthing) {
    const uploadPaths = [
      path.join(targetDir, "src", "app", "api", "v1", "uploadthing"),
      path.join(targetDir, "src", "utils", "uploadthing.ts"),
    ];
    for (const p of uploadPaths) {
      await fs.remove(p).catch(() => {});
    }
  }

  // Remove arcjet files if not needed
  if (!options.includeRateLimiting) {
    const arcjetPaths = [
      path.join(targetDir, "src", "lib", "arcjet.ts"),
    ];
    for (const p of arcjetPaths) {
      await fs.remove(p).catch(() => {});
    }
  }

  // Remove TanStack Query files if not needed
  if (!options.includeTanstack) {
    const tanstackPaths = [
      path.join(targetDir, "src", "components", "query-provider.tsx"),
    ];
    for (const p of tanstackPaths) {
      await fs.remove(p).catch(() => {});
    }
  }

  // Success message
  console.log(chalk.green.bold("\n✅ Project created successfully!\n"));
  
  console.log(chalk.white("📦 Stack included:"));
  console.log(chalk.gray("   • Next.js 16 with App Router"));
  console.log(chalk.gray("   • TypeScript"));
  console.log(chalk.gray("   • tRPC"));
  if (options.includeTanstack) console.log(chalk.gray("   • TanStack Query (React Query)"));
  console.log(chalk.gray("   • Drizzle ORM + PostgreSQL"));
  console.log(chalk.gray("   • Better-Auth (GitHub, Google, Email)"));
  if (options.includeRateLimiting) console.log(chalk.gray("   • Arcjet (Rate Limiting)"));
  console.log(chalk.gray("   • Tailwind CSS"));
  if (options.includeAI) console.log(chalk.gray("   • Vercel AI SDK (Claude)"));
  if (options.includeUploadthing) console.log(chalk.gray("   • UploadThing (File Uploads)"));
  
  console.log(chalk.white("\n📝 Next steps:\n"));
  console.log(chalk.cyan(`   cd ${projectName}`));
  console.log(chalk.cyan("   npm install"));
  console.log(chalk.gray("   # Update .env with your credentials"));
  console.log(chalk.cyan("   npm run db:push"));
  console.log(chalk.cyan("   npm run dev\n"));

  console.log(chalk.white("🔐 Required environment variables:"));
  console.log(chalk.gray("   • DATABASE_URL (Neon/PostgreSQL)"));
  console.log(chalk.gray("   • BETTER_AUTH_SECRET"));
  console.log(chalk.gray("   • GITHUB_CLIENT_ID & GITHUB_CLIENT_SECRET"));
  console.log(chalk.gray("   • GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET"));
  if (options.includeRateLimiting) console.log(chalk.gray("   • ARCJET_KEY"));
  if (options.includeAI) console.log(chalk.gray("   • AI_GATEWAY_API_KEY"));
  if (options.includeUploadthing) console.log(chalk.gray("   • UPLOADTHING_TOKEN"));
  console.log("");
}

main().catch((err) => {
  console.error(chalk.red("\n❌ Error:"), err.message);
  process.exit(1);
});
