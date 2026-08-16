import { AdminSidebar } from "@/components/admin/admin-sidebar";

// Admin pages read live DB state and sit behind session auth — never
// static-optimize them.
export const dynamic = "force-dynamic";

export default function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <AdminSidebar />
      <main className="flex-1 overflow-x-auto p-6 sm:p-8">{children}</main>
    </div>
  );
}
