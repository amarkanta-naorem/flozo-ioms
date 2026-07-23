"use client";
import Sidebar from "@/components/common/_dashboard-sidebar";
import { useRouter } from "next/navigation";

export default function SecureLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className="relative flex gap-4 min-h-screen bg-(--bg-primary) p-4">
      <Sidebar />
      <main className="relative flex-1">{children}</main>
    </div>
  );
}
