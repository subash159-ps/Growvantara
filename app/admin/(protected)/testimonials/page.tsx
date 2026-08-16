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
import { TestimonialFormDialog } from "@/components/admin/testimonial-form-dialog";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteTestimonial } from "@/lib/actions/testimonials";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Testimonials</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage client testimonials shown on the Home page.
          </p>
        </div>
        <TestimonialFormDialog trigger={<Button>New testimonial</Button>} />
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Quote</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.map((testimonial) => (
              <TableRow key={testimonial.id}>
                <TableCell className="font-medium">
                  {testimonial.clientName}
                  {testimonial.company ? (
                    <div className="text-xs font-normal text-muted-foreground">
                      {testimonial.company}
                    </div>
                  ) : null}
                </TableCell>
                <TableCell className="max-w-sm truncate text-muted-foreground">
                  {testimonial.quote}
                </TableCell>
                <TableCell>
                  <Badge variant={testimonial.published ? "default" : "secondary"}>
                    {testimonial.published ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell className="flex justify-end gap-2">
                  <TestimonialFormDialog
                    testimonial={testimonial}
                    trigger={
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    }
                  />
                  <DeleteButton
                    id={testimonial.id}
                    action={deleteTestimonial}
                    confirmMessage={`Delete testimonial from "${testimonial.clientName}"?`}
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
