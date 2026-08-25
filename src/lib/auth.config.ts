import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/account/login",
    error: "/account/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const userRole = (auth?.user as any)?.role;

      const isAdminRoute = nextUrl.pathname.startsWith("/admin");
      const isCustomerRoute = nextUrl.pathname.startsWith("/customer");
      const isPrinterRoute = nextUrl.pathname.startsWith("/printer");

      if (isAdminRoute) {
        if (!isLoggedIn) return false;
        return userRole === "ADMIN";
      }

      if (isCustomerRoute) {
        if (!isLoggedIn) return false;
        return userRole === "CUSTOMER" || userRole === "ADMIN";
      }

      if (isPrinterRoute) {
        if (!isLoggedIn) return false;
        return userRole === "WORKSHOP" || userRole === "INDIVIDUAL" || userRole === "ADMIN";
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "CUSTOMER";
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },
  providers: [],
};
