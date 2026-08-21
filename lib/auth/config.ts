import type { NextAuthConfig } from "next-auth";
import type { UserRole } from "@/app/generated/prisma/client";

// Edge-safe config shared by the full (Node) auth instance and the
// middleware-only instance. Must not import anything that pulls in Prisma
// or bcrypt — those are Node-only and break the Edge middleware bundle.
// The UserRole import above is type-only and erased at compile time, so it
// doesn't pull the Prisma runtime into the Edge bundle.
export const authConfig = {
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = (user as { role: UserRole }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
