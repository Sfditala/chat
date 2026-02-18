"use client";

import { ClerkProvider, useUser, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { convex } from "@/lib/convexClient";
import Sidebar from "@/components/layout/sidebar";
import { useMutation } from "convex/react";
import { useEffect } from "react";
import { api } from "../convex/_generated/api";

export default function Providers({ children }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <InnerProviders>{children}</InnerProviders>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

function InnerProviders({ children }) {
  const { isSignedIn, user } = useUser();

  // نضع الـ Mutation هنا بعد التأكد أنها داخل ConvexProviderWithClerk
  const storeUser = useMutation(api.users.storeUser);

  useEffect(() => {
    // إذا سجل المستخدم دخوله، نقوم بحفظه في قاعدة بيانات Convex
    if (isSignedIn) {
      storeUser();
    }
  }, [isSignedIn, storeUser]);

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-background">
      {/* الـ Sidebar يظهر فقط إذا كان المستخدم مسجل دخول */}
      {isSignedIn && <Sidebar />}

      <main className="flex-1 flex overflow-hidden">{children}</main>
    </div>
  );
}
