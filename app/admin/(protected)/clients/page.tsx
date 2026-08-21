import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { STAFF_ROLES, canManageClients } from "@/lib/auth/permissions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClientFormDialog } from "@/components/admin/client-form-dialog";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteClient } from "@/lib/actions/clients";

export default async function AdminClientsPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/admin/login");
  }
  if (!STAFF_ROLES.includes(session.user.role)) {
    redirect("/admin/dashboard");
  }

  const canManage = canManageClients(session);

  const clients = await prisma.client.findMany({
    include: { _count: { select: { campaigns: true } } },
    orderBy: { name: "asc" },
  });

  const activeCount = clients.filter((c) => c.active).length;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Clients</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Companies campaigns are tagged with, for filtering and reporting by client.
          </p>
        </div>
        {canManage && <ClientFormDialog trigger={<Button>New client</Button>} />}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{clients.length.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{activeCount.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Campaigns</TableHead>
              <TableHead>Status</TableHead>
              {canManage && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell className="text-muted-foreground">{client.contactName || "—"}</TableCell>
                <TableCell className="text-muted-foreground">{client.email || "—"}</TableCell>
                <TableCell className="text-muted-foreground">{client.phone || "—"}</TableCell>
                <TableCell>{client._count.campaigns.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={client.active ? "default" : "secondary"}>
                    {client.active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                {canManage && (
                  <TableCell className="flex justify-end gap-2">
                    <ClientFormDialog
                      client={client}
                      trigger={
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      }
                    />
                    <DeleteButton
                      id={client.id}
                      action={deleteClient}
                      confirmMessage={`Delete "${client.name}"?`}
                    />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
