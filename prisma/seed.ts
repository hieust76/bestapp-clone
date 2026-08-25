import { PrismaClient, Role, ProductType, ProductStatus, DeliveryType, CouponType, LicenseStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Bắt đầu seeding dữ liệu mẫu cho BestApp Digital Goods Platform...");

  // 1. Clean existing data (if tables exist)
  try {
    await prisma.auditLog.deleteMany();
    await prisma.license.deleteMany();
    await prisma.paymentEvent.deleteMany();
    await prisma.payment.deleteMany();
    await prisma.couponUsage.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.flashSale.deleteMany();
    await prisma.review.deleteMany();
    await prisma.productVariant.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.coupon.deleteMany();
    await prisma.blogPost.deleteMany();
    await prisma.blogTopic.deleteMany();
    await prisma.session.deleteMany();
    await prisma.account.deleteMany();
    await prisma.user.deleteMany();
  } catch (e) {
    console.log("ℹ️ Bỏ qua xoá bảng cũ (có thể chưa tạo bảng)");
  }

  // 2. Seed Users
  const adminPasswordHash = await bcrypt.hash("Admin@123", 12);
  const userPasswordHash = await bcrypt.hash("User@123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@bestapp.vn" },
    update: {},
    create: {
      email: "admin@bestapp.vn",
      name: "Quản Trị Viên BestApp",
      passwordHash: adminPasswordHash,
      role: Role.ADMIN,
      balance: 10000000,
      phone: "0988123456",
    },
  });

  const testUser = await prisma.user.upsert({
    where: { email: "khachhang@gmail.com" },
    update: {},
    create: {
      email: "khachhang@gmail.com",
      name: "Nguyễn Văn An",
      passwordHash: userPasswordHash,
      role: Role.USER,
      balance: 500000,
      phone: "0912345678",
    },
  });

  console.log(`✅ Đã tạo Users: Admin (${admin.email}), User (${testUser.email})`);

  // 3. Seed Categories
  const categoriesData = [
    {
      name: "AI & Chatbot",
      slug: "ai-chatbot",
      description: "Tài khoản ChatGPT Plus, Claude 3.5 Sonnet, Midjourney v6, Perplexity Pro giá rẻ bản quyền.",
      icon: "Bot",
      sortOrder: 1,
      isFeatured: true,
    },
    {
      name: "Đồ Hoạ & Thiết Kế",
      slug: "design",
      description: "Tài khoản Canva Pro nâng cấp chính chủ, Adobe Creative Cloud trọn bộ, Freepik Premium, Figma Pro.",
      icon: "Palette",
      sortOrder: 2,
      isFeatured: true,
    },
    {
      name: "Bản Quyền OS & Office",
      slug: "os-office",
      description: "Key Windows 10/11 Pro chính hãng, Microsoft 365 Personal, Office 2021 Professional Plus trọn đời.",
      icon: "Laptop",
      sortOrder: 3,
      isFeatured: true,
    },
    {
      name: "Lưu Trữ Cloud & Drive",
      slug: "cloud-storage",
      description: "Gói dung lượng Google One 2TB, Microsoft OneDrive 1TB - 5TB, iCloud Drive nâng cấp an toàn.",
      icon: "Cloud",
      sortOrder: 4,
      isFeatured: true,
    },
    {
      name: "Học Tập & Ngoại Ngữ",
      slug: "learning",
      description: "Duolingo Super, Elsa Speak Pro, Coursera Plus, Quizlet Plus, Grammarly Premium hỗ trợ học tập.",
      icon: "GraduationCap",
      sortOrder: 5,
      isFeatured: true,
    },
    {
      name: "VPN & Bảo Mật",
      slug: "vpn-security",
      description: "NordVPN, ExpressVPN, Surfshark, AdGuard VPN vượt tường lửa bảo vệ danh tính tuyệt đối.",
      icon: "Shield",
      sortOrder: 6,
      isFeatured: true,
    },
    {
      name: "Giải Trí & Stream",
      slug: "entertainment",
      description: "YouTube Premium không quảng cáo, Spotify Premium cá nhân, Netflix 4K UHD, Apple Music.",
      icon: "Film",
      sortOrder: 7,
      isFeatured: true,
    },
    {
      name: "Lập Trình & Developer",
      slug: "developer-tools",
      description: "JetBrains All Products Pack, GitHub Copilot, Cursor AI Pro, ChatGPT API Credits.",
      icon: "Code2",
      sortOrder: 8,
      isFeatured: true,
    },
  ];

  const categoryMap: Record<string, string> = {};

  for (const cat of categoriesData) {
    const created = await prisma.category.create({
      data: cat,
    });
    categoryMap[cat.slug] = created.id;
  }
  console.log(`✅ Đã tạo ${categoriesData.length} danh mục sản phẩm.`);

  // 4. Seed Products & Variants (18 products)
  const productsData = [
    // --- 1. ChatGPT Plus ---
    {
      categorySlug: "ai-chatbot",
      name: "Tài Khoản ChatGPT Plus Chính Chủ",
      slug: "chatgpt-plus",
      shortDescription: "Truy cập không giới hạn GPT-4o, DALL-E 3, Canvas, Code Interpreter và Voice Mode thế hệ mới.",
      description: `### Giới thiệu ChatGPT Plus\nChatGPT Plus là gói dịch vụ cao cấp nhất của OpenAI mang lại trải nghiệm tương tác với trí tuệ nhân tạo mượt mà, thông minh nhất hiện nay.\n\n### Quyền lợi tài khoản:\n- Sử dụng mô hình GPT-4o và GPT-4 không giới hạn câu hỏi.\n- Tốc độ phản hồi nhanh gấp 5 lần so với gói Free.\n- Tạo ảnh nghệ thuật đỉnh cao với DALL-E 3.\n- Phân tích dữ liệu, chạy code Python và đọc hiểu file PDF, Excel.\n\n### Chế độ bảo hành:\n- Bảo hành 1-đổi-1 trong suốt thời gian sử dụng.\n- Hỗ trợ đổi mật khẩu và đổi email an toàn.`,
      type: ProductType.ACCOUNT,
      status: ProductStatus.ACTIVE,
      isFeatured: true,
      coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
      badgeText: "Bán Chạy Nhất",
      rating: 4.9,
      totalSold: 1540,
      variants: [
        {
          name: "1 Tháng - Tài Khoản Cấp Sẵn",
          price: 499000,
          salePrice: 189000,
          stock: 45,
          deliveryType: DeliveryType.AUTO_ACCOUNT,
          durationDays: 30,
          sku: "GPT-1M-ACC",
        },
        {
          name: "3 Tháng - Tài Khoản Cấp Sẵn",
          price: 1400000,
          salePrice: 520000,
          stock: 30,
          deliveryType: DeliveryType.AUTO_ACCOUNT,
          durationDays: 90,
          sku: "GPT-3M-ACC",
        },
        {
          name: "1 Tháng - Nâng Cấp Email Chính Chủ",
          price: 520000,
          salePrice: 289000,
          stock: 50,
          deliveryType: DeliveryType.UPGRADE_LINK,
          durationDays: 30,
          sku: "GPT-1M-UPGRADE",
        },
      ],
    },
    // --- 2. Claude 3.5 Sonnet Pro ---
    {
      categorySlug: "ai-chatbot",
      name: "Tài Khoản Claude 3.5 Sonnet Pro",
      slug: "claude-3-5-sonnet-pro",
      shortDescription: "Công cụ AI đỉnh cao cho lập trình viên, viết lách và xử lý văn bản khổng lồ với tính năng Artifacts.",
      description: `### Claude 3.5 Sonnet Pro\nClaude 3.5 là mô hình AI được đánh giá thông minh nhất thế giới hiện nay trong tác vụ Coding, Reasoning và phân tích ngữ cảnh phức tạp.\n\n### Đặc điểm nổi bật:\n- Cửa sổ ngữ cảnh siêu lớn 200K tokens.\n- Tính năng Artifacts cho phép render code, biểu đồ và component trực tiếp.\n- Giới hạn tin nhắn cao hơn 5 lần bản miễn phí.`,
      type: ProductType.ACCOUNT,
      status: ProductStatus.ACTIVE,
      isFeatured: true,
      coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80",
      badgeText: "HOT AI",
      rating: 5.0,
      totalSold: 890,
      variants: [
        {
          name: "1 Tháng - Tài Khoản Cấp Sẵn",
          price: 520000,
          salePrice: 219000,
          stock: 35,
          deliveryType: DeliveryType.AUTO_ACCOUNT,
          durationDays: 30,
          sku: "CLAUDE-1M-ACC",
        },
      ],
    },
    // --- 3. Midjourney v6 ---
    {
      categorySlug: "ai-chatbot",
      name: "Tài Khoản Midjourney v6 Standard",
      slug: "midjourney-v6-standard",
      shortDescription: "Tạo hình ảnh và đồ hoạ AI nghệ thuật chất lượng photorealistic 4K đỉnh cao.",
      description: "Midjourney v6 cho phép tạo hình ảnh siêu thực với độ phân giải cao và khả năng hiểu prompt tuyệt vời.",
      type: ProductType.ACCOUNT,
      status: ProductStatus.ACTIVE,
      isFeatured: false,
      coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
      rating: 4.8,
      totalSold: 620,
      variants: [
        {
          name: "Gói Basic 1 Tháng",
          price: 300000,
          salePrice: 159000,
          stock: 25,
          deliveryType: DeliveryType.AUTO_ACCOUNT,
          durationDays: 30,
          sku: "MJ-BASIC-1M",
        },
        {
          name: "Gói Standard 1 Tháng (Không giới hạn Relax)",
          price: 750000,
          salePrice: 389000,
          stock: 20,
          deliveryType: DeliveryType.AUTO_ACCOUNT,
          durationDays: 30,
          sku: "MJ-STD-1M",
        },
      ],
    },
    // --- 4. Canva Pro ---
    {
      categorySlug: "design",
      name: "Tài Khoản Canva Pro 1 Năm",
      slug: "canva-pro-1-nam",
      shortDescription: "Nâng cấp trực tiếp email cá nhân. Mở khoá 100M+ mẫu thiết kế, font chữ và công cụ Magic AI.",
      description: "Canva Pro là công cụ thiết kế đồ họa trực tuyến số 1 cho người sáng tạo nội dung, marketer và học sinh sinh viên.",
      type: ProductType.UPGRADE,
      status: ProductStatus.ACTIVE,
      isFeatured: true,
      coverImage: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&auto=format&fit=crop&q=80",
      badgeText: "Giá Siêu Rẻ",
      rating: 4.9,
      totalSold: 3200,
      variants: [
        {
          name: "Gói 1 Năm - Nâng Cấp Email Chính Chủ",
          price: 350000,
          salePrice: 149000,
          stock: 100,
          deliveryType: DeliveryType.UPGRADE_LINK,
          durationDays: 365,
          sku: "CANVA-1Y-UPG",
        },
        {
          name: "Gói Vĩnh Viễn (Bảo hành 2 năm)",
          price: 600000,
          salePrice: 289000,
          stock: 80,
          deliveryType: DeliveryType.UPGRADE_LINK,
          durationDays: 730,
          sku: "CANVA-LIFETIME",
        },
      ],
    },
    // --- 5. Adobe Creative Cloud ---
    {
      categorySlug: "design",
      name: "Adobe Creative Cloud Trọn Bộ (Full Apps)",
      slug: "adobe-creative-cloud-full-apps",
      shortDescription: "Trọn bộ 20+ ứng dụng Adobe (Photoshop, Illustrator, Premiere, After Effects) kèm 100GB Cloud.",
      description: "Bộ công cụ sáng tạo chuyên nghiệp chuẩn ngành thiết kế từ Adobe.",
      type: ProductType.UPGRADE,
      status: ProductStatus.ACTIVE,
      isFeatured: true,
      coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
      rating: 4.9,
      totalSold: 740,
      variants: [
        {
          name: "Gói 1 Tháng - Email Chính Chủ",
          price: 450000,
          salePrice: 219000,
          stock: 40,
          deliveryType: DeliveryType.UPGRADE_LINK,
          durationDays: 30,
          sku: "ADOBE-1M-UPG",
        },
        {
          name: "Gói 1 Năm - Email Chính Chủ",
          price: 3200000,
          salePrice: 1590000,
          stock: 25,
          deliveryType: DeliveryType.UPGRADE_LINK,
          durationDays: 365,
          sku: "ADOBE-1Y-UPG",
        },
      ],
    },
    // --- 6. Windows 11 Pro ---
    {
      categorySlug: "os-office",
      name: "Key Bản Quyền Windows 11 Pro",
      slug: "key-windows-11-pro",
      shortDescription: "Key Retail kích hoạt trực tiếp trên 1 PC vĩnh viễn, nhận trọn vẹn các bản update từ Microsoft.",
      description: "Bản quyền Windows 11 Pro chính hãng giúp máy tính hoạt động ổn định và bảo mật cao.",
      type: ProductType.CODE,
      status: ProductStatus.ACTIVE,
      isFeatured: true,
      coverImage: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80",
      badgeText: "-75%",
      rating: 5.0,
      totalSold: 4100,
      variants: [
        {
          name: "Key 1 PC Vĩnh Viễn (Online Activation)",
          price: 390000,
          salePrice: 99000,
          stock: 120,
          deliveryType: DeliveryType.AUTO_KEY,
          durationDays: 3650,
          sku: "WIN11-PRO-RETAIL",
        },
        {
          name: "Key 1 PC Bind Tài Khoản Microsoft",
          price: 550000,
          salePrice: 189000,
          stock: 80,
          deliveryType: DeliveryType.AUTO_KEY,
          durationDays: 3650,
          sku: "WIN11-PRO-BIND",
        },
      ],
    },
    // --- 7. Microsoft 365 + OneDrive 1TB ---
    {
      categorySlug: "os-office",
      name: "Tài Khoản Microsoft 365 + 1TB OneDrive",
      slug: "microsoft-365-1tb-onedrive",
      shortDescription: "Cài đặt Word, Excel, PowerPoint trên 5 máy tính + 1000GB lưu trữ đám mây an toàn.",
      description: "Trọn bộ ứng dụng văn phòng hiện đại nhất cùng kho lưu trữ OneDrive tốc độ cao.",
      type: ProductType.ACCOUNT,
      status: ProductStatus.ACTIVE,
      isFeatured: true,
      coverImage: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80",
      rating: 4.9,
      totalSold: 1890,
      variants: [
        {
          name: "Gói 1 Năm - Tài Khoản Cấp Sẵn",
          price: 450000,
          salePrice: 179000,
          stock: 60,
          deliveryType: DeliveryType.AUTO_ACCOUNT,
          durationDays: 365,
          sku: "M365-1Y-ACC",
        },
      ],
    },
    // --- 8. Google One 2TB ---
    {
      categorySlug: "cloud-storage",
      name: "Dung Lượng Google One 2TB",
      slug: "google-one-2tb",
      shortDescription: "Nâng cấp bộ nhớ Google Drive, Gmail, Google Photos lên 2000GB chính chủ.",
      description: "Thoải mái lưu trữ ảnh, video và tài liệu quan trọng với dung lượng Google One 2TB.",
      type: ProductType.UPGRADE,
      status: ProductStatus.ACTIVE,
      isFeatured: false,
      coverImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80",
      rating: 4.9,
      totalSold: 930,
      variants: [
        {
          name: "Gói 1 Năm - Add Family Nhóm Chính Chủ",
          price: 600000,
          salePrice: 289000,
          stock: 50,
          deliveryType: DeliveryType.UPGRADE_LINK,
          durationDays: 365,
          sku: "G-ONE-2TB-1Y",
        },
      ],
    },
    // --- 9. Duolingo Super ---
    {
      categorySlug: "learning",
      name: "Tài Khoản Duolingo Super 1 Năm",
      slug: "duolingo-super-1-nam",
      shortDescription: "Học ngoại ngữ không giới hạn trái tim, không quảng cáo, mở khoá bài kiểm tra nâng cao.",
      description: "Trải nghiệm học Tiếng Anh, Tiếng Trung, Tiếng Nhật... tuyệt vời nhất với Duolingo Super.",
      type: ProductType.UPGRADE,
      status: ProductStatus.ACTIVE,
      isFeatured: true,
      coverImage: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&auto=format&fit=crop&q=80",
      rating: 4.9,
      totalSold: 1450,
      variants: [
        {
          name: "Gói 1 Năm - Gia Nhập Nhóm Học Tập",
          price: 300000,
          salePrice: 159000,
          stock: 90,
          deliveryType: DeliveryType.UPGRADE_LINK,
          durationDays: 365,
          sku: "DUO-SUPER-1Y",
        },
      ],
    },
    // --- 10. Elsa Speak Pro ---
    {
      categorySlug: "learning",
      name: "Elsa Speak Pro Luyện Phát Âm AI",
      slug: "elsa-speak-pro",
      shortDescription: "Ứng dụng luyện phát âm Tiếng Anh chuẩn bản xứ với AI nhận diện giọng nói chính xác.",
      description: "Cải thiện phát âm và phản xạ giao tiếp Tiếng Anh nhanh chóng cùng trợ lý AI Elsa Speak.",
      type: ProductType.ACCOUNT,
      status: ProductStatus.ACTIVE,
      isFeatured: false,
      coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80",
      rating: 4.8,
      totalSold: 780,
      variants: [
        {
          name: "Gói 1 Năm Pro",
          price: 490000,
          salePrice: 249000,
          stock: 40,
          deliveryType: DeliveryType.AUTO_ACCOUNT,
          durationDays: 365,
          sku: "ELSA-PRO-1Y",
        },
      ],
    },
    // --- 11. NordVPN ---
    {
      categorySlug: "vpn-security",
      name: "Tài Khoản NordVPN Cao Cấp",
      slug: "nordvpn-cao-cap",
      shortDescription: "VPN bảo mật hàng đầu thế giới, 6000+ máy chủ tốc độ cao, mã hoá quân đội.",
      description: "Bảo vệ quyền riêng tư và truy cập mọi trang web không giới hạn vị trí địa lý.",
      type: ProductType.ACCOUNT,
      status: ProductStatus.ACTIVE,
      isFeatured: true,
      coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
      rating: 4.9,
      totalSold: 1100,
      variants: [
        {
          name: "Gói 1 Năm - Sử dụng 6 thiết bị",
          price: 450000,
          salePrice: 199000,
          stock: 45,
          deliveryType: DeliveryType.AUTO_ACCOUNT,
          durationDays: 365,
          sku: "NORD-1Y-ACC",
        },
      ],
    },
    // --- 12. Surfshark VPN ---
    {
      categorySlug: "vpn-security",
      name: "Tài Khoản Surfshark VPN",
      slug: "surfshark-vpn",
      shortDescription: "Kết nối thiết bị không giới hạn, tính năng CleanWeb chặn quảng cáo độc hại.",
      description: "Lướt web ẩn danh nhanh chóng với chi phí tiết kiệm nhất.",
      type: ProductType.ACCOUNT,
      status: ProductStatus.ACTIVE,
      isFeatured: false,
      coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
      rating: 4.8,
      totalSold: 610,
      variants: [
        {
          name: "Gói 1 Năm",
          price: 380000,
          salePrice: 179000,
          stock: 35,
          deliveryType: DeliveryType.AUTO_ACCOUNT,
          durationDays: 365,
          sku: "SURF-1Y-ACC",
        },
      ],
    },
    // --- 13. YouTube Premium ---
    {
      categorySlug: "entertainment",
      name: "Tài Khoản YouTube Premium 1 Năm",
      slug: "youtube-premium-1-nam",
      shortDescription: "Xem video hoàn toàn không quảng cáo, phát trong nền và nghe YouTube Music Premium.",
      description: "Thoải mái tận hưởng thế giới video và âm nhạc không bị gián đoạn.",
      type: ProductType.UPGRADE,
      status: ProductStatus.ACTIVE,
      isFeatured: true,
      coverImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=80",
      badgeText: "Cực Hot",
      rating: 4.9,
      totalSold: 4600,
      variants: [
        {
          name: "Gói 1 Năm - Gia Nhập Family Chính Chủ",
          price: 400000,
          salePrice: 249000,
          stock: 120,
          deliveryType: DeliveryType.UPGRADE_LINK,
          durationDays: 365,
          sku: "YTB-PREM-1Y",
        },
      ],
    },
    // --- 14. Spotify Premium ---
    {
      categorySlug: "entertainment",
      name: "Tài Khoản Spotify Premium 1 Năm",
      slug: "spotify-premium-1-nam",
      shortDescription: "Nghe nhạc không quảng cáo, tải nhạc offline chất lượng âm thanh cao nhất.",
      description: "Thư viện âm nhạc trực tuyến phong phú nhất thế giới nâng cấp trực tiếp vào tài khoản cá nhân.",
      type: ProductType.UPGRADE,
      status: ProductStatus.ACTIVE,
      isFeatured: true,
      coverImage: "https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=800&auto=format&fit=crop&q=80",
      rating: 4.9,
      totalSold: 2100,
      variants: [
        {
          name: "Gói 1 Năm - Nâng Cấp Email Chính Chủ",
          price: 360000,
          salePrice: 189000,
          stock: 80,
          deliveryType: DeliveryType.UPGRADE_LINK,
          durationDays: 365,
          sku: "SPOTIFY-1Y-UPG",
        },
      ],
    },
    // --- 15. JetBrains All Products ---
    {
      categorySlug: "developer-tools",
      name: "JetBrains All Products Pack 1 Năm",
      slug: "jetbrains-all-products-pack",
      shortDescription: "Trọn bộ IDE xịn nhất thế giới (IntelliJ IDEA, WebStorm, PyCharm, PhpStorm, GoLand...).",
      description: "Bộ công cụ phát triển phần mềm toàn diện cho các lập trình viên chuyên nghiệp.",
      type: ProductType.ACCOUNT,
      status: ProductStatus.ACTIVE,
      isFeatured: true,
      coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
      rating: 5.0,
      totalSold: 580,
      variants: [
        {
          name: "Gói 1 Năm - Tài Khoản Cấp Sẵn",
          price: 850000,
          salePrice: 399000,
          stock: 30,
          deliveryType: DeliveryType.AUTO_ACCOUNT,
          durationDays: 365,
          sku: "JETBRAINS-1Y-ACC",
        },
      ],
    },
    // --- 16. GitHub Copilot ---
    {
      categorySlug: "developer-tools",
      name: "GitHub Copilot Cá Nhân 1 Năm",
      slug: "github-copilot-1-nam",
      shortDescription: "Trợ lý AI lập trình cặp hỗ trợ viết code siêu tốc ngay trong VS Code, JetBrains.",
      description: "Tăng 55% tốc độ lập trình với gợi ý thông minh từ AI của OpenAI & GitHub.",
      type: ProductType.UPGRADE,
      status: ProductStatus.ACTIVE,
      isFeatured: true,
      coverImage: "https://images.unsplash.com/photo-1618401471353-b98aedd04e11?w=800&auto=format&fit=crop&q=80",
      rating: 4.9,
      totalSold: 830,
      variants: [
        {
          name: "Gói 1 Năm - Nâng Cấp Username GitHub",
          price: 900000,
          salePrice: 429000,
          stock: 40,
          deliveryType: DeliveryType.UPGRADE_LINK,
          durationDays: 365,
          sku: "COPILOT-1Y-UPG",
        },
      ],
    },
  ];

  const variantListForLicenses: { id: string; sku: string; deliveryType: DeliveryType }[] = [];

  for (const item of productsData) {
    const categoryId = categoryMap[item.categorySlug];
    if (!categoryId) continue;

    const product = await prisma.product.create({
      data: {
        name: item.name,
        slug: item.slug,
        shortDescription: item.shortDescription,
        description: item.description,
        categoryId: categoryId,
        type: item.type,
        status: item.status,
        isFeatured: item.isFeatured,
        coverImage: item.coverImage,
        badgeText: item.badgeText,
        rating: item.rating,
        totalSold: item.totalSold,
        warrantyPolicy: "Bảo hành 1-đổi-1 toàn diện trong suốt thời hạn sử dụng gói dịch vụ.",
        instructionHtml: "<p>Đăng nhập với email và mật khẩu được cấp hoặc nhấp vào liên kết kích hoạt gửi qua đơn hàng.</p>",
        variants: {
          create: item.variants.map((v, idx) => ({
            name: v.name,
            price: v.price,
            salePrice: v.salePrice,
            stock: v.stock,
            deliveryType: v.deliveryType,
            durationDays: v.durationDays,
            sku: v.sku,
            sortOrder: idx,
          })),
        },
      },
      include: {
        variants: true,
      },
    });

    for (const v of product.variants) {
      variantListForLicenses.push({
        id: v.id,
        sku: v.sku || v.id,
        deliveryType: v.deliveryType,
      });
    }
  }

  console.log(`✅ Đã tạo ${productsData.length} sản phẩm và ${variantListForLicenses.length} biến thể variants.`);

  // 5. Seed Licenses & Inventory Items
  let licenseCount = 0;
  for (const v of variantListForLicenses) {
    // Tạo 3-5 license/acc cho mỗi variant
    for (let i = 1; i <= 3; i++) {
      let codeData = "";
      if (v.deliveryType === DeliveryType.AUTO_KEY) {
        codeData = `W269N-WFGWX-YVC9B-4J6C9-${Math.floor(10000 + Math.random() * 90000)}`;
      } else if (v.deliveryType === DeliveryType.AUTO_ACCOUNT) {
        codeData = `bestapp_user_${Math.floor(1000 + Math.random() * 9000)}@digital.pro|Pass_${Math.random().toString(36).slice(-8)}`;
      } else {
        codeData = `https://invite.family.bestapp.vn/join?token=${Math.random().toString(36).slice(-12)}`;
      }

      await prisma.license.create({
        data: {
          variantId: v.id,
          codeEncrypted: codeData,
          status: LicenseStatus.AVAILABLE,
        },
      });
      licenseCount++;
    }
  }
  console.log(`✅ Đã nạp ${licenseCount} tài khoản/key vào kho hàng số.`);

  // 6. Seed Coupons
  const coupons = [
    {
      code: "WELCOME10",
      description: "Giảm 10% cho đơn hàng đầu tiên",
      type: CouponType.PERCENT,
      value: 10,
      minOrder: 100000,
      maxDiscount: 50000,
      maxUsage: 500,
    },
    {
      code: "BESTAPP50",
      description: "Giảm trực tiếp 50.000đ cho đơn từ 300.000đ",
      type: CouponType.FIXED,
      value: 50000,
      minOrder: 300000,
      maxDiscount: null,
      maxUsage: 200,
    },
    {
      code: "FLASH70",
      description: "Voucher săn deal Flash Sale giảm 70k",
      type: CouponType.FIXED,
      value: 70000,
      minOrder: 200000,
      maxDiscount: null,
      maxUsage: 100,
    },
  ];

  for (const c of coupons) {
    await prisma.coupon.create({
      data: c,
    });
  }
  console.log(`✅ Đã tạo ${coupons.length} mã giảm giá coupon.`);

  // 7. Seed FlashSale
  if (variantListForLicenses.length > 0) {
    const flashVariant = variantListForLicenses[0];
    await prisma.flashSale.create({
      data: {
        variantId: flashVariant.id,
        salePrice: 159000,
        stock: 50,
        soldCount: 38,
        startsAt: new Date(),
        endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });
    console.log("✅ Đã kích hoạt Flash Sale mẫu.");
  }

  // 8. Seed Blog Topics & Posts
  const topic = await prisma.blogTopic.create({
    data: {
      name: "Hướng Dẫn & Thủ Thuật AI",
      slug: "huong-dan-ai",
      description: "Mẹo sử dụng ChatGPT, Midjourney, Claude hiệu quả trong công việc.",
    },
  });

  await prisma.blogPost.create({
    data: {
      title: "Top 5 Lý Do Nên Sử Dụng Claude 3.5 Sonnet Để Lập Trình Thay Cho GPT-4",
      slug: "top-5-ly-do-su-dung-claude-3-5-sonnet",
      excerpt: "Phân tích chi tiết khả năng xử lý code và tính năng Artifacts đột phá của Claude 3.5.",
      content: "Nội dung bài viết chi tiết về đánh giá thực tế điểm benchmark của Claude 3.5 Sonnet...",
      coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
      topicId: topic.id,
      isPublished: true,
      publishedAt: new Date(),
    },
  });

  console.log("🎉 Seeding database hoàn tất thành công!");
}

main()
  .catch((e) => {
    console.error("❌ Lỗi khi seed dữ liệu:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
