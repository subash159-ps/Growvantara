import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

// Admin pages read live DB state and sit behind session auth — never
// static-optimize them.
export const dynamic = "force-dynamic";

export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <AdminSidebar role={session.user.role} />
      <main className="flex-1 overflow-x-auto p-6 sm:p-8">{children}</main>
    </div>
  );
}
