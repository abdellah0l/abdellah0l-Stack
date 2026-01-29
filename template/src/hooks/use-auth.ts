'use client'

import { authClient } from "@/lib/auth-client";

interface User {
  id: string
  name: string
  email: string
  image?: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isSignedIn: boolean
}

// a custom hook to access authentication state in your components
export function useAuth(): AuthState {
  const { data: session, isPending: isLoading } = authClient.useSession();

  return {
    user: session?.user ? {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image || undefined,
    } : null,
    isLoading,
    isSignedIn: !!session,
  };
}
