import Sidebar from "@/components/common/_dashboard-sidebar";

export default function Home() {
  return (
    <div className="relative flex gap-4 min-h-screen bg-(--bg-primary) p-4">
      <Sidebar />
    </div>
  );
}
