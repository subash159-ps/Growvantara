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
import { PortfolioFormDialog } from "@/components/admin/portfolio-form-dialog";
import { DeleteButton } from "@/components/admin/delete-button";
import { deletePortfolioItem } from "@/lib/actions/portfolio";

export default async function AdminPortfolioPage() {
  const items = await prisma.portfolio.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Portfolio</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Demo and concept projects shown in &quot;Our Work&quot;.
          </p>
        </div>
        <PortfolioFormDialog trigger={<Button>New project</Button>} />
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {item.type === "DEMO" ? "Demo" : "Concept"}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{item.category ?? "—"}</TableCell>
                <TableCell>
                  <Badge variant={item.published ? "default" : "secondary"}>
                    {item.published ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell className="flex justify-end gap-2">
                  <PortfolioFormDialog
                    item={item}
                    trigger={
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    }
                  />
                  <DeleteButton
                    id={item.id}
                    action={deletePortfolioItem}
                    confirmMessage={`Delete "${item.title}"?`}
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
