import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ServiceFormDialog } from "@/components/admin/service-form-dialog";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteService } from "@/lib/actions/services";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Services</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage the services shown on the Home and Services pages.
          </p>
        </div>
        <ServiceFormDialog trigger={<Button>New service</Button>} />
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.order}</TableCell>
                <TableCell className="font-medium">{service.title}</TableCell>
                <TableCell className="text-muted-foreground">{service.slug}</TableCell>
                <TableCell>
                  <Badge variant={service.published ? "default" : "secondary"}>
                    {service.published ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell className="flex justify-end gap-2">
                  <ServiceFormDialog
                    service={service}
                    trigger={
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    }
                  />
                  <DeleteButton
                    id={service.id}
                    action={deleteService}
                    confirmMessage={`Delete "${service.title}"?`}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
