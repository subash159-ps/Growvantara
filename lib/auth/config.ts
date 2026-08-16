import type { NextAuthConfig } from "next-auth";

// Edge-safe config shared by the full (Node) auth instance and the
// middleware-only instance. Must not import anything that pulls in Prisma
// or bcrypt — those are Node-only and break the Edge middleware bundle.
export const authConfig = {
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.sub = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) session.user.id = token.sub;
      return session;
    },
  },
} satisfies NextAuthConfig;
