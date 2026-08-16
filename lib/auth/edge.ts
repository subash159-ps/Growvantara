import NextAuth from "next-auth";
import { authConfig } from "./config";

// Used by middleware.ts only — no providers, no Prisma. Just validates the
// session cookie/JWT, which is all middleware needs to do.
export const { auth } = NextAuth(authConfig);
