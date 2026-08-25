"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signIn, signOut } from "@/lib/auth";
import { Role } from "@prisma/client";

const registerSchema = z.object({
  name: z.string().min(2, "Họ và tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Email không đúng định dạng"),
  password: z.string().min(6, "Mật khẩu phải từ 6 ký tự trở lên"),
  phone: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email("Email không đúng định dạng"),
  password: z.string().min(6, "Mật khẩu phải từ 6 ký tự"),
});

/**
 * Server Action: Đăng ký tài khoản người dùng mới
 */
export async function registerAction(prevState: any, formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      phone: (formData.get("phone") as string) || undefined,
    };

    const validated = registerSchema.safeParse(rawData);
    if (!validated.success) {
      return {
        success: false,
        error: validated.error.errors[0].message,
      };
    }

    const { email, password, name, phone } = validated.data;

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return {
        success: false,
        error: "Email này đã được đăng ký trên hệ thống. Vui lòng đăng nhập.",
      };
    }

    // Hash password với bcryptjs (cost factor 12)
    const passwordHash = await bcrypt.hash(password, 12);

    // Tạo User trong Database
    const newUser = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        name,
        passwordHash,
        phone,
        role: Role.USER,
        balance: 0,
      },
    });

    // Tạo AuditLog
    await prisma.auditLog.create({
      data: {
        userId: newUser.id,
        action: "USER_REGISTER",
        entityType: "USER",
        entityId: newUser.id,
        metadata: { email: newUser.email, name: newUser.name },
      },
    });

    return {
      success: true,
      message: "Đăng ký tài khoản thành công! Vui lòng đăng nhập.",
    };
  } catch (error: any) {
    console.error("Register Error:", error);
    return {
      success: false,
      error: error.message || "Đã xảy ra lỗi trong quá trình đăng ký.",
    };
  }
}

/**
 * Server Action: Yêu cầu đặt lại mật khẩu (Mock Email Reset)
 */
export async function requestPasswordResetAction(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email") as string;
    if (!email || !email.includes("@")) {
      return { success: false, error: "Vui lòng nhập địa chỉ email hợp lệ" };
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      // Giả lập an toàn: không báo lộ email có tồn tại hay không
      return {
        success: true,
        message: "Nếu email tồn tại trong hệ thống, hướng dẫn đặt lại mật khẩu đã được gửi.",
      };
    }

    // Tạo verification token
    const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 giờ

    await prisma.verificationToken.create({
      data: {
        identifier: email.toLowerCase(),
        token,
        expires,
      },
    });

    console.log(`🔑 [Mock Email Service] Link reset mật khẩu cho ${email}: http://localhost:3000/account/reset-password?token=${token}&email=${encodeURIComponent(email)}`);

    return {
      success: true,
      message: "Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn.",
    };
  } catch (error: any) {
    return { success: false, error: "Không thể xử lý yêu cầu vào lúc này." };
  }
}

/**
 * Server Action: Đăng xuất người dùng
 */
export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}
