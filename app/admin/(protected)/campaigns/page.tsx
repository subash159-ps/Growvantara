import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { STAFF_ROLES, isCampaignAdmin, canManageCampaign } from "@/lib/auth/permissions";
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
import { CampaignFormDialog } from "@/components/admin/campaign-form-dialog";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteCampaign } from "@/lib/actions/campaigns";

const channelLabels: Record<string, string> = {
  GOOGLE_ADS: "Google Ads",
  META_ADS: "Meta Ads",
  SEO: "SEO",
  SOCIAL_MEDIA: "Social Media",
  EMAIL: "Email",
  CONTENT: "Content",
  OTHER: "Other",
};

const statusLabels: Record<string, string> = {
  PLANNED: "Planned",
  ACTIVE: "Active",
  PAUSED: "Paused",
  COMPLETED: "Completed",
};

function formatCurrency(value: number) {
  return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function ratio(numerator: number, denominator: number) {
  if (!denominator) return null;
  return numerator / denominator;
}

export default async function AdminCampaignsPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/admin/login");
  }
  if (!STAFF_ROLES.includes(session.user.role)) {
    redirect("/admin/dashboard");
  }

  const isAdmin = isCampaignAdmin(session);
  const where = session.user.role === "CAMPAIGN_MANAGER" ? { managerId: session.user.id } : {};

  const [campaigns, clients, managers] = await Promise.all([
    prisma.campaign.findMany({
      where,
      include: { client: true, manager: { select: { id: true, name: true } } },
      orderBy: { startDate: "desc" },
    }),
    prisma.client.findMany({ where: { active: true }, orderBy: { name: "asc" } }),
    prisma.user.findMany({ where: { role: "CAMPAIGN_MANAGER" }, orderBy: { name: "asc" } }),
  ]);

  const totalSpend = campaigns.reduce((sum, c) => sum + c.spend, 0);
  const totalLeads = campaigns.reduce((sum, c) => sum + c.leadsGenerated, 0);
  const activeCount = campaigns.filter((c) => c.status === "ACTIVE").length;
  const avgCpl = ratio(totalSpend, totalLeads);

  const stats = [
    { label: "Total Spend", value: formatCurrency(totalSpend) },
    { label: "Total Leads Generated", value: totalLeads.toLocaleString() },
    { label: "Avg. Cost Per Lead", value: avgCpl !== null ? formatCurrency(avgCpl) : "—" },
    { label: "Active Campaigns", value: activeCount.toLocaleString() },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Campaigns</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track spend and performance across marketing campaigns.
          </p>
        </div>
        {isAdmin && (
          <CampaignFormDialog
            clients={clients}
            managers={managers}
            canReassign
            trigger={<Button>New campaign</Button>}
          />
        )}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Manager</TableHead>
              <TableHead>Channel</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Spend</TableHead>
              <TableHead>Leads</TableHead>
              <TableHead>CTR</TableHead>
              <TableHead>CPL</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign) => {
              const ctr = ratio(campaign.clicks, campaign.impressions);
              const cpl = ratio(campaign.spend, campaign.leadsGenerated);
              const canEdit = canManageCampaign(session, campaign);
              return (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell className="text-muted-foreground">{campaign.client.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {campaign.manager?.name ?? "Unassigned"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{channelLabels[campaign.channel]}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={campaign.status === "ACTIVE" ? "default" : "secondary"}>
                      {statusLabels[campaign.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatCurrency(campaign.spend)}</TableCell>
                  <TableCell>{campaign.leadsGenerated.toLocaleString()}</TableCell>
                  <TableCell>{ctr !== null ? `${(ctr * 100).toFixed(2)}%` : "—"}</TableCell>
                  <TableCell>{cpl !== null ? formatCurrency(cpl) : "—"}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {campaign.startDate.toLocaleDateString()}
                    {campaign.endDate ? ` – ${campaign.endDate.toLocaleDateString()}` : ""}
                  </TableCell>
                  <TableCell className="flex justify-end gap-2">
                    {canEdit && (
                      <CampaignFormDialog
                        campaign={campaign}
                        clients={clients}
                        managers={managers}
                        canReassign={isAdmin}
                        trigger={
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        }
                      />
                    )}
                    {isAdmin && (
                      <DeleteButton
                        id={campaign.id}
                        action={deleteCampaign}
                        confirmMessage={`Delete "${campaign.name}"?`}
                      />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
