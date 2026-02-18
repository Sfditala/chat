"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/sign-up"); // إعادة توجيه سريع بدون حفظ التاريخ
  }, [router]);

  return null;
}
