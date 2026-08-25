import { PrismaClient, Role, PrinterType, MaterialType, PrinterStatus, ProjectCategory, ProjectStatus, FileType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Bắt đầu Seed dữ liệu cho 3D Printing Marketplace (In3D Hub)...");

  // Xoá dữ liệu cũ theo thứ tự quan hệ
  try {
    await prisma.notification.deleteMany();
    await prisma.review.deleteMany();
    await prisma.escrowTransaction.deleteMany();
    await prisma.contract.deleteMany();
    await prisma.message.deleteMany();
    await prisma.conversation.deleteMany();
    await prisma.projectInvitation.deleteMany();
    await prisma.projectFile.deleteMany();
    await prisma.project.deleteMany();
    await prisma.printerProfile.deleteMany();
    await prisma.session.deleteMany();
    await prisma.account.deleteMany();
    await prisma.user.deleteMany();
  } catch (e) {
    console.log("Bỏ qua bước dọn dẹp hoặc bảng chưa tồn tại.");
  }

  const defaultPasswordHash = await bcrypt.hash("Admin@123", 12);
  const userPasswordHash = await bcrypt.hash("User@123", 12);

  // 1. Tạo Quản Trị Viên (Admin)
  const admin = await prisma.user.create({
    data: {
      email: "admin@in3d.vn",
      name: "Ban Quản Trị In3D Hub",
      phone: "0901234567",
      passwordHash: defaultPasswordHash,
      role: Role.ADMIN,
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=admin",
    },
  });

  // 2. Tạo Khách Hàng (Customer)
  const customer1 = await prisma.user.create({
    data: {
      email: "khachhang1@gmail.com",
      name: "Nguyễn Thành Long (Startup IoT)",
      phone: "0912345678",
      passwordHash: userPasswordHash,
      role: Role.CUSTOMER,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=long",
    },
  });

  const customer2 = await prisma.user.create({
    data: {
      email: "khachhang2@gmail.com",
      name: "Trần Mai Phương (Kiến Trúc Sư)",
      phone: "0923456789",
      passwordHash: userPasswordHash,
      role: Role.CUSTOMER,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=phuong",
    },
  });

  // 3. Tạo Xưởng In 3D Chuyên Nghiệp (Workshops)
  const workshop1User = await prisma.user.create({
    data: {
      email: "contact@3dhubsaigon.vn",
      name: "Xưởng In 3D Hub Sài Gòn",
      phone: "0934567890",
      passwordHash: userPasswordHash,
      role: Role.WORKSHOP,
      avatar: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=200",
    },
  });

  const ws1Profile = await prisma.printerProfile.create({
    data: {
      userId: workshop1User.id,
      businessName: "3D Hub Sài Gòn - Trung Tâm In 3D Công Nghiệp",
      bio: "Xưởng in 3D quy mô 12 máy Bambu Lab X1-Carbon, 4 máy Formlabs SLA Resin. Nhận in tạo mẫu nhanh, linh kiện kỹ thuật chính xác cao, xuất VAT đầy đủ.",
      address: "128 Nguyễn Trãi, Phường Bến Thành",
      district: "Quận 1",
      province: "TP. Hồ Chí Minh",
      latitude: 10.7719,
      longitude: 106.6934,
      printerTypes: [PrinterType.FDM, PrinterType.SLA_RESIN],
      materials: [MaterialType.PLA, MaterialType.ABS, MaterialType.PETG, MaterialType.RESIN_TOUGH, MaterialType.CARBON_FIBER],
      machineCount: 16,
      machineModels: "12x Bambu Lab X1C, 4x Formlabs Form 3+",
      maxVolumeX: 300,
      maxVolumeY: 300,
      maxVolumeZ: 350,
      status: PrinterStatus.AVAILABLE,
      isVerified: true,
      rating: 4.95,
      ratingCount: 142,
      completedJobs: 289,
      responseTimeMin: 8,
    },
  });

  const workshop2User = await prisma.user.create({
    data: {
      email: "info@bachkhoa3d.vn",
      name: "Xưởng In 3D Kỹ Thuật Bách Khoa",
      phone: "0945678901",
      passwordHash: userPasswordHash,
      role: Role.WORKSHOP,
      avatar: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=200",
    },
  });

  const ws2Profile = await prisma.printerProfile.create({
    data: {
      userId: workshop2User.id,
      businessName: "Xưởng In 3D Bách Khoa Engineering",
      bio: "Chuyên in mẫu cơ khí chính xác, bánh răng, đồ gá jig, vỏ hộp điện tử bằng vật liệu chịu nhiệt ABS, Nylon PA12 và Carbon Fiber.",
      address: "268 Lý Thường Kiệt, Phường 14",
      district: "Quận 10",
      province: "TP. Hồ Chí Minh",
      latitude: 10.7725,
      longitude: 106.6578,
      printerTypes: [PrinterType.FDM, PrinterType.SLS],
      materials: [MaterialType.ABS, MaterialType.PETG, MaterialType.NYLON_PA12, MaterialType.CARBON_FIBER],
      machineCount: 8,
      machineModels: "Prusa XL 5-Tool, Voron 2.4, Bambu X1E",
      maxVolumeX: 360,
      maxVolumeY: 360,
      maxVolumeZ: 360,
      status: PrinterStatus.AVAILABLE,
      isVerified: true,
      rating: 4.88,
      ratingCount: 89,
      completedJobs: 174,
      responseTimeMin: 12,
    },
  });

  const workshop3User = await prisma.user.create({
    data: {
      email: "studio@mekongresin.vn",
      name: "Mekong 3D Anime & Art Studio",
      phone: "0956789012",
      passwordHash: userPasswordHash,
      role: Role.WORKSHOP,
      avatar: "https://images.unsplash.com/photo-1563089145-599997674d42?w=200",
    },
  });

  const ws3Profile = await prisma.printerProfile.create({
    data: {
      userId: workshop3User.id,
      businessName: "Mekong 3D Resin Figure & Art Studio",
      bio: "Chuyên in Resin 8K / 12K siêu nét cho tượng Anime, nhân vật game, sa bàn thu nhỏ và mô hình trang sức. Có dịch vụ chà nhám, sơn lót.",
      address: "85 Nguyễn Thị Thập, Tân Phú",
      district: "Quận 7",
      province: "TP. Hồ Chí Minh",
      latitude: 10.7382,
      longitude: 106.7214,
      printerTypes: [PrinterType.SLA_RESIN, PrinterType.DLP],
      materials: [MaterialType.RESIN_STD, MaterialType.RESIN_TOUGH],
      machineCount: 10,
      machineModels: "Elegoo Saturn 4 Ultra 12K, Anycubic M5s Pro",
      maxVolumeX: 218,
      maxVolumeY: 123,
      maxVolumeZ: 250,
      status: PrinterStatus.AVAILABLE,
      isVerified: true,
      rating: 4.98,
      ratingCount: 210,
      completedJobs: 430,
      responseTimeMin: 5,
    },
  });

  // 4. Tạo Cá Nhân Có Máy In 3D (Individual Printers)
  const individual1User = await prisma.user.create({
    data: {
      email: "hung.print3d@gmail.com",
      name: "Nguyễn Văn Hùng (Bambu Lab P1S)",
      phone: "0967890123",
      passwordHash: userPasswordHash,
      role: Role.INDIVIDUAL,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=hung3d",
    },
  });

  const ind1Profile = await prisma.printerProfile.create({
    data: {
      userId: individual1User.id,
      businessName: "Hùng Maker - In 3D Nhanh Bình Thạnh",
      bio: "Mình có máy Bambu Lab P1S in sợi tốc độ cao. Nhận in đồ chơi, phụ kiện, giá đỡ điện thoại, chi tiết thay thế giá sinh viên, phục vụ khu vực Bình Thạnh, Phú Nhuận.",
      address: "45 Điện Biên Phủ, Phường 15",
      district: "Quận Bình Thạnh",
      province: "TP. Hồ Chí Minh",
      latitude: 10.7932,
      longitude: 106.7025,
      printerTypes: [PrinterType.FDM],
      materials: [MaterialType.PLA, MaterialType.PETG, MaterialType.TPU_FLEX],
      machineCount: 2,
      machineModels: "Bambu Lab P1S Combo AMS, Creality Ender 3 V3",
      maxVolumeX: 256,
      maxVolumeY: 256,
      maxVolumeZ: 256,
      status: PrinterStatus.AVAILABLE,
      isVerified: true,
      rating: 4.9,
      ratingCount: 35,
      completedJobs: 58,
      responseTimeMin: 10,
    },
  });

  const individual2User = await prisma.user.create({
    data: {
      email: "duc.resin.hn@gmail.com",
      name: "Trần Minh Đức (Anycubic Photon)",
      phone: "0978901234",
      passwordHash: userPasswordHash,
      role: Role.INDIVIDUAL,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=duc_resin",
    },
  });

  const ind2Profile = await prisma.printerProfile.create({
    data: {
      userId: individual2User.id,
      businessName: "Đức 3D Resin Hà Nội",
      bio: "Nhận in resin tượng figure, keycap bàn phím cơ, linh kiện nhỏ chi tiết cực nét. Rửa sấy UV tiêu chuẩn.",
      address: "182 Chùa Láng, Láng Thượng",
      district: "Quận Đống Đa",
      province: "Hà Nội",
      latitude: 21.0227,
      longitude: 105.8019,
      printerTypes: [PrinterType.SLA_RESIN],
      materials: [MaterialType.RESIN_STD, MaterialType.RESIN_TOUGH],
      machineCount: 1,
      machineModels: "Anycubic Photon Mono X 6Ks",
      maxVolumeX: 200,
      maxVolumeY: 125,
      maxVolumeZ: 200,
      status: PrinterStatus.AVAILABLE,
      isVerified: true,
      rating: 5.0,
      ratingCount: 19,
      completedJobs: 27,
      responseTimeMin: 15,
    },
  });

  // 5. Tạo Các Dự Án Mẫu (Sample Projects)
  const project1 = await prisma.project.create({
    data: {
      code: "PRJ-902184",
      title: "In vỏ hộp cảm biến IoT chống nước ngoài trời",
      description: "Cần in 5 bộ vỏ hộp chống nước cho board mạch ESP32 và cảm biến đất. Yêu cầu vật liệu chịu nắng mưa PETG hoặc ABS màu đen, độ dày thành 3mm, có rãnh gắn ron cao su chống nước.",
      category: ProjectCategory.PROTOTYPE,
      desiredMaterial: MaterialType.PETG,
      desiredColor: "Đen mờ (Matte Black)",
      infillPercent: 40,
      layerHeight: 0.2,
      quantity: 5,
      targetBudget: 450000,
      isNegotiable: true,
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      deliveryAddress: "72 Lê Thánh Tôn, Bến Nghé",
      district: "Quận 1",
      province: "TP. Hồ Chí Minh",
      latitude: 10.7769,
      longitude: 106.7009,
      status: ProjectStatus.OPEN,
      customerId: customer1.id,
      files: {
        create: [
          {
            fileName: "esp32_iot_case_top_v3.stl",
            fileUrl: "https://bestapp-cdn.com/models/esp32_case_top.stl",
            fileSize: 2450000,
            fileType: FileType.STL,
          },
          {
            fileName: "esp32_iot_case_bottom_v3.stl",
            fileUrl: "https://bestapp-cdn.com/models/esp32_case_bottom.stl",
            fileSize: 3120000,
            fileType: FileType.STL,
          },
        ],
      },
      invitations: {
        create: [
          {
            printerProfileId: ws1Profile.id,
            distanceKm: 0.9, // 900m
            status: "PENDING",
          },
          {
            printerProfileId: ind1Profile.id,
            distanceKm: 2.1,
            status: "PENDING",
          },
          {
            printerProfileId: ws2Profile.id,
            distanceKm: 4.8,
            status: "PENDING",
          },
          {
            printerProfileId: ws3Profile.id,
            distanceKm: 5.2,
            status: "PENDING",
          },
        ],
      },
    },
  });

  const project2 = await prisma.project.create({
    data: {
      code: "PRJ-819203",
      title: "In tượng nhân vật Raiden Shogun 20cm độ chi tiết cao",
      description: "File 3D đã cắt sẵn 12 mảnh, cần in bằng công nghệ Resin SLA/DLP để giữ nguyên các chi tiết tóc, hoa văn trang phục. Yêu cầu xử lý support sạch sẽ, rửa cồn và sấy UV hoàn thiện.",
      category: ProjectCategory.FIGURE_ANIME,
      desiredMaterial: MaterialType.RESIN_STD,
      desiredColor: "Xám (Grey)",
      infillPercent: 100,
      layerHeight: 0.05,
      quantity: 1,
      targetBudget: 650000,
      isNegotiable: true,
      deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      deliveryAddress: "Khu Đô Thị Phú Mỹ Hưng, Tân Phong",
      district: "Quận 7",
      province: "TP. Hồ Chí Minh",
      latitude: 10.7295,
      longitude: 106.7088,
      status: ProjectStatus.OPEN,
      customerId: customer2.id,
      files: {
        create: [
          {
            fileName: "raiden_shogun_body_split.3mf",
            fileUrl: "https://bestapp-cdn.com/models/raiden_shogun.3mf",
            fileSize: 45800000,
            fileType: FileType.THREE_MF,
          },
        ],
      },
      invitations: {
        create: [
          {
            printerProfileId: ws3Profile.id,
            distanceKm: 1.5,
            status: "PENDING",
          },
          {
            printerProfileId: ws1Profile.id,
            distanceKm: 5.6,
            status: "PENDING",
          },
        ],
      },
    },
  });

  console.log("✅ Seed dữ liệu 3D Printing Marketplace thành công!");
  console.log(`- 1 Admin: admin@in3d.vn / Admin@123`);
  console.log(`- 2 Customers: khachhang1@gmail.com, khachhang2@gmail.com / User@123`);
  console.log(`- 3 Workshops: contact@3dhubsaigon.vn, info@bachkhoa3d.vn, studio@mekongresin.vn / User@123`);
  console.log(`- 2 Individuals: hung.print3d@gmail.com, duc.resin.hn@gmail.com / User@123`);
  console.log(`- 2 Sample Projects với lời mời matchmaking`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
