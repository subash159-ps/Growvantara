import type { Session } from "next-auth";
import { auth } from "@/lib/auth";
import type { UserRole } from "@/app/generated/prisma/client";

export class AuthError extends Error {
  status: 401 | 403;
  constructor(message: string, status: 401 | 403 = 403) {
    super(message);
    this.status = status;
  }
}

type SessionWithUser = Session & { user: Session["user"] & { id: string; role: UserRole } };

/** Roles allowed into the admin area at all. */
export const STAFF_ROLES: UserRole[] = ["SUPER_ADMIN", "ADMIN", "CAMPAIGN_MANAGER", "ANALYST"];

/** Roles with full, unscoped campaign CRUD (create/delete/reassign). */
export const CAMPAIGN_ADMIN_ROLES: UserRole[] = ["SUPER_ADMIN", "ADMIN"];

/** Roles that can create/edit/delete clients. */
export const CLIENT_ADMIN_ROLES: UserRole[] = ["SUPER_ADMIN", "ADMIN"];

export async function requireSession(): Promise<SessionWithUser> {
  const session = await auth();
  if (!session?.user?.id) throw new AuthError("Unauthorized", 401);
  return session as SessionWithUser;
}

export async function requireRole(...roles: UserRole[]): Promise<SessionWithUser> {
  const session = await requireSession();
  if (!roles.includes(session.user.role)) {
    throw new AuthError(`Forbidden: requires one of [${roles.join(", ")}]`);
  }
  return session;
}

export function isCampaignAdmin(session: SessionWithUser): boolean {
  return CAMPAIGN_ADMIN_ROLES.includes(session.user.role);
}

/** Can this session edit an existing campaign's own fields (status/spend/metrics/notes/dates)? */
export function canManageCampaign(
  session: SessionWithUser,
  campaign: { managerId: string | null },
): boolean {
  if (isCampaignAdmin(session)) return true;
  return session.user.role === "CAMPAIGN_MANAGER" && campaign.managerId === session.user.id;
}

/** Can this session change a campaign's clientId/managerId (reassign)? */
export function canReassignCampaign(session: SessionWithUser): boolean {
  return isCampaignAdmin(session);
}

export function canManageClients(session: SessionWithUser): boolean {
  return CLIENT_ADMIN_ROLES.includes(session.user.role);
}
