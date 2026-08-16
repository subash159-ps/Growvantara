// Console-based audit trail for v1. The `audit_logs` table is deferred to
// v2 (see SKILL.md); this keeps a lightweight record in server logs until
// then.

export function logAdminAction(userId: string, action: string, target: string) {
  console.log(`[audit] user=${userId} action=${action} target=${target} at=${new Date().toISOString()}`);
}
