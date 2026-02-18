"use client";

import { useEffect, useState } from "react";
import { SignUp, useUser, useClerk } from "@clerk/nextjs";

export default function SignUpPage() {
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      if (isSignedIn) {
        await signOut(); // يسجّل خروج المستخدم فعليًا
      }
      setReady(true); // نقدر نعرض SignUp بعد ما نتأكد المستخدم خرج
    };
    checkUser();
  }, [isSignedIn, signOut]);

  if (!ready) return <p>Preparing SignUp...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-md justify-center">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        afterSignUpUrl="/chat"
      />
    </div>
  );
}
