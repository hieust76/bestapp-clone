export type UserRole = "USER" | "SUPPORT" | "ADMIN";

export interface UserProfile {
  id: string;
  name?: string | null;
  email: string;
  role: UserRole;
  balance: number;
  phone?: string | null;
  image?: string | null;
  createdAt: Date | string;
}
