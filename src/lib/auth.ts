import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { authConfig } from "@/lib/auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mật khẩu", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = (credentials.email as string).toLowerCase().trim();
        const password = credentials.password as string;

        try {
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user || !user.passwordHash) {
            // Mock fallback admin/user if database not yet migrated
            if (email === "admin@in3d.vn" && password === "Admin@123") {
              return {
                id: "admin-id",
                email: "admin@in3d.vn",
                name: "Ban Quản Trị In3D Hub",
                role: "ADMIN",
              };
            }
            if (email === "contact@3dhubsaigon.vn" && password === "User@123") {
              return {
                id: "workshop-id",
                email: "contact@3dhubsaigon.vn",
                name: "3D Hub Sài Gòn",
                role: "WORKSHOP",
              };
            }
            return null;
          }

          const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.avatar,
          };
        } catch (error) {
          console.error("Auth authorize error:", error);
          return null;
        }
      },
    }),
  ],
});
