import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@/server';

// create a tRPC React hook for the AppRouter, the job of this file is to provide type-safe hooks for tRPC in React components
export const trpc = createTRPCReact<AppRouter>();