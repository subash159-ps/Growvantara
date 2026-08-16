import { prisma } from "@/lib/db";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SettingForm } from "@/components/admin/setting-form";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteSiteSetting } from "@/lib/actions/settings";

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSetting.findMany({ orderBy: { key: "asc" } });

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        General site settings, stored as key/value pairs.
      </p>

      <div className="mt-8 max-w-xl">
        <SettingForm />
      </div>

      <div className="mt-8 max-w-xl overflow-x-auto rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Key</TableHead>
              <TableHead>Value</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {settings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground">
                  No settings yet.
                </TableCell>
              </TableRow>
            ) : (
              settings.map((setting) => (
                <TableRow key={setting.id}>
                  <TableCell className="font-mono text-sm">{setting.key}</TableCell>
                  <TableCell className="text-muted-foreground">{setting.value}</TableCell>
                  <TableCell className="text-right">
                    <DeleteButton
                      id={setting.key}
                      action={deleteSiteSetting}
                      confirmMessage={`Delete setting "${setting.key}"?`}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
