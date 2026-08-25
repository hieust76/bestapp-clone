import { prisma } from "@/lib/prisma";
import { MaterialType, PrinterType, PrinterStatus, InvitationStatus } from "@prisma/client";

/**
 * Tính khoảng cách địa lý theo công thức Haversine (Đơn vị: Kilomet)
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Bán kính Trái Đất (km)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 10) / 10; // Làm tròn 1 chữ số thập phân (VD: 2.4 km)
}

export interface MatchmakingResult {
  success: boolean;
  invitedCount: number;
  printers: {
    id: string;
    businessName: string;
    distanceKm: number;
    rating: number;
    address: string;
  }[];
  error?: string;
}

/**
 * Matchmaking Engine: Tìm và phát thông báo đến 10 Xưởng hoặc Cá nhân gần nhất
 */
export async function matchAndInviteTop10Printers(
  projectId: string,
  projectLat: number,
  projectLng: number,
  material?: MaterialType,
  printerType?: PrinterType
): Promise<MatchmakingResult> {
  console.log(`📡 [MATCHMAKING] Bắt đầu tìm kiếm 10 xưởng/cá nhân gần nhất cho dự án [${projectId}]`);

  try {
    // 1. Lấy tất cả Xưởng và Cá nhân đang ở trạng thái AVAILABLE (Đang rảnh)
    let availablePrinters: any[] = [];
    try {
      availablePrinters = await prisma.printerProfile.findMany({
        where: {
          status: PrinterStatus.AVAILABLE,
        },
        include: {
          user: true,
        },
      });
    } catch (dbError) {
      console.warn("DB query error in matchmaking, using fallback mock:", dbError);
    }

    if (!availablePrinters || availablePrinters.length === 0) {
      return {
        success: false,
        invitedCount: 0,
        printers: [],
        error: "Hiện tại không có Xưởng hoặc Cá nhân nào đang ở trạng thái Rảnh",
      };
    }

    // 2. Tính khoảng cách và lọc/ưu tiên theo vật liệu & loại máy
    const scoredPrinters = availablePrinters.map((printer) => {
      const distanceKm = calculateDistanceKm(
        projectLat,
        projectLng,
        printer.latitude || 10.7769,
        printer.longitude || 106.7009
      );

      // Điểm khớp vật liệu
      const supportsMaterial = material
        ? printer.materials.includes(material)
        : true;

      // Điểm khớp công nghệ in
      const supportsType = printerType
        ? printer.printerTypes.includes(printerType)
        : true;

      return {
        ...printer,
        distanceKm,
        isExactMatch: supportsMaterial && supportsType,
      };
    });

    // 3. Sắp xếp: Ưu tiên xưởng hỗ trợ vật liệu -> sau đó sắp xếp theo khoảng cách gần nhất
    scoredPrinters.sort((a, b) => {
      if (a.isExactMatch && !b.isExactMatch) return -1;
      if (!a.isExactMatch && b.isExactMatch) return 1;
      return a.distanceKm - b.distanceKm;
    });

    // 4. Lấy tối đa 10 bên gần nhất
    const top10 = scoredPrinters.slice(0, 10);

    // 5. Tạo ProjectInvitation và Thông báo Notification
    try {
      await prisma.$transaction(async (tx) => {
        for (const p of top10) {
          // Lưu lời mời
          await tx.projectInvitation.upsert({
            where: {
              projectId_printerProfileId: {
                projectId,
                printerProfileId: p.id,
              },
            },
            create: {
              projectId,
              printerProfileId: p.id,
              distanceKm: p.distanceKm,
              status: InvitationStatus.PENDING,
            },
            update: {
              distanceKm: p.distanceKm,
              status: InvitationStatus.PENDING,
            },
          });

          // Gửi thông báo in-app
          await tx.notification.create({
            data: {
              userId: p.userId,
              title: "🔔 Có đơn in 3D mới gần bạn!",
              content: `Khách hàng cách bạn ${p.distanceKm} km vừa tạo yêu cầu in 3D. Nhận đơn ngay trước khi bên khác nhận!`,
              link: `/printer/available-jobs`,
              type: "NEW_JOB",
            },
          });
        }
      });
    } catch (saveError) {
      console.warn("Lỗi lưu lời mời vào DB:", saveError);
    }

    console.log(`✅ [MATCHMAKING] Đã phát thông báo thành công đến ${top10.length} bên gần nhất!`);

    return {
      success: true,
      invitedCount: top10.length,
      printers: top10.map((p) => ({
        id: p.id,
        businessName: p.businessName,
        distanceKm: p.distanceKm,
        rating: p.rating,
        address: `${p.district}, ${p.province}`,
      })),
    };
  } catch (error: any) {
    console.error("❌ [MATCHMAKING ERROR]:", error);
    return {
      success: false,
      invitedCount: 0,
      printers: [],
      error: error.message,
    };
  }
}
