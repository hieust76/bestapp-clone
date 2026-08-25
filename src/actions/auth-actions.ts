"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { Role, PrinterStatus, PrinterType, MaterialType } from "@prisma/client";

/**
 * Server Action: Đăng ký tài khoản (Hỗ trợ Khách hàng, Xưởng in, hoặc Cá nhân)
 */
export async function registerUserAction(formData: FormData) {
  try {
    const email = (formData.get("email") as string).toLowerCase().trim();
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    const phone = (formData.get("phone") as string) || null;
    const role = (formData.get("role") as Role) || Role.CUSTOMER;

    // Các trường bổ sung nếu là Xưởng hoặc Cá nhân
    const businessName = (formData.get("businessName") as string) || name;
    const address = (formData.get("address") as string) || "Chưa cập nhật";
    const district = (formData.get("district") as string) || "Quận 1";
    const province = (formData.get("province") as string) || "TP. Hồ Chí Minh";
    const machineModels = (formData.get("machineModels") as string) || "Bambu Lab / Creality / Anycubic";

    if (!email || !password) {
      return { success: false, error: "Vui lòng nhập đầy đủ email và mật khẩu" };
    }

    // Kiểm tra email đã tồn tại
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return { success: false, error: "Địa chỉ email này đã được đăng ký tài khoản." };
      }
    } catch (e) {
      // Tiếp tục nếu DB mock
    }

    // Hash mật khẩu an toàn
    const passwordHash = await bcrypt.hash(password, 12);

    // Tạo User & PrinterProfile nếu có
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        phone,
        role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
        ...(role === Role.WORKSHOP || role === Role.INDIVIDUAL
          ? {
              printerProfile: {
                create: {
                  businessName,
                  address,
                  district,
                  province,
                  machineModels,
                  machineCount: role === Role.WORKSHOP ? 6 : 1,
                  printerTypes: [PrinterType.FDM],
                  materials: [MaterialType.PLA, MaterialType.PETG],
                  status: PrinterStatus.AVAILABLE,
                  rating: 5.0,
                  ratingCount: 0,
                  completedJobs: 0,
                  responseTimeMin: 15,
                },
              },
            }
          : {}),
      },
    });

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      message: "Đăng ký tài khoản thành công!",
    };
  } catch (error: any) {
    return { success: false, error: error.message || "Đã xảy ra lỗi khi tạo tài khoản." };
  }
}

/**
 * Server Action: Quên mật khẩu
 */
export async function requestPasswordResetAction(formData: FormData) {
  try {
    const email = (formData.get("email") as string).toLowerCase().trim();
    return {
      success: true,
      message: `Liên kết khôi phục mật khẩu đã được gửi đến ${email}.`,
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Server Action: Đăng xuất
 */
export async function logoutAction() {
  return { success: true };
}
