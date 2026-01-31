"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminHomeRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/admin/content/home");
  }, [router]);
  return null;
}
