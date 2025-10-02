// providers.tsx (Client Component)
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "@/store";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/Components/Navbar";
import { usePathname } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  // Create QueryClient inside the client component
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: true,
          },
        },
      })
  );
  const pathname = usePathname();

  const hideNavbarOn = ["/login", "/register"];

  const showNavbar = !hideNavbarOn.includes(pathname);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SessionProvider>
          <>
            {showNavbar && <Navbar />}
            <main>{children}</main>
          </>
        </SessionProvider>
      </Provider>
      <Toaster />
    </QueryClientProvider>
  );
}
