import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/components/query-provider";
import { Navigation } from "@/components/navigation";
import "./globals.css";

// configures here the metadata for your application
export const metadata: Metadata = {
  title: "My App",
  description: "A modern full-stack application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white">
        <QueryProvider>
          <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              iconTheme: {
                primary: '#22c55e',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
          <Navigation />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
