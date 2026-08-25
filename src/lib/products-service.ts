import { prisma } from "@/lib/prisma";

export interface MockCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  isFeatured: boolean;
}

export interface MockVariant {
  id: string;
  productId: string;
  name: string;
  price: number;
  salePrice?: number | null;
  stock: number;
  deliveryType: "AUTO_ACCOUNT" | "AUTO_KEY" | "UPGRADE_LINK" | "MANUAL";
  durationDays?: number | null;
  sku?: string | null;
}

export interface MockProduct {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  categoryId: string;
  category?: MockCategory;
  type: "ACCOUNT" | "CODE" | "UPGRADE";
  status: "ACTIVE" | "DRAFT" | "OUT_OF_STOCK";
  isFeatured: boolean;
  coverImage: string;
  images: string[];
  badgeText?: string | null;
  rating: number;
  totalSold: number;
  warrantyPolicy?: string | null;
  instructionHtml?: string | null;
  variants: MockVariant[];
}

export const fallbackCategories: MockCategory[] = [
  {
    id: "cat-ai",
    name: "AI & Chatbot",
    slug: "ai-chatbot",
    description: "Tài khoản ChatGPT Plus, Claude 3.5, Midjourney, Perplexity Pro.",
    icon: "Bot",
    isFeatured: true,
  },
  {
    id: "cat-design",
    name: "Đồ Hoạ & Thiết Kế",
    slug: "design",
    description: "Canva Pro, Adobe Creative Cloud, Freepik, Figma.",
    icon: "Palette",
    isFeatured: true,
  },
  {
    id: "cat-os",
    name: "Bản Quyền OS & Office",
    slug: "os-office",
    description: "Key Windows 10/11 Pro, Office 365, Microsoft 365.",
    icon: "Laptop",
    isFeatured: true,
  },
  {
    id: "cat-cloud",
    name: "Lưu Trữ Cloud",
    slug: "cloud-storage",
    description: "Google One 2TB, Microsoft OneDrive 1TB - 5TB.",
    icon: "Cloud",
    isFeatured: true,
  },
  {
    id: "cat-learn",
    name: "Học Tập & Ngoại Ngữ",
    slug: "learning",
    description: "Duolingo Super, Elsa Speak Pro, Coursera Plus.",
    icon: "GraduationCap",
    isFeatured: true,
  },
  {
    id: "cat-vpn",
    name: "VPN & Bảo Mật",
    slug: "vpn-security",
    description: "NordVPN, ExpressVPN, Surfshark.",
    icon: "Shield",
    isFeatured: true,
  },
  {
    id: "cat-ent",
    name: "Giải Trí & Âm Nhạc",
    slug: "entertainment",
    description: "YouTube Premium, Spotify, Netflix 4K.",
    icon: "Film",
    isFeatured: true,
  },
  {
    id: "cat-dev",
    name: "Công Cụ Lập Trình",
    slug: "developer-tools",
    description: "JetBrains All Products, GitHub Copilot, Cursor AI.",
    icon: "Code2",
    isFeatured: true,
  },
];

export const fallbackProducts: MockProduct[] = [
  {
    id: "p-chatgpt",
    name: "Tài Khoản ChatGPT Plus Chính Chủ",
    slug: "chatgpt-plus",
    shortDescription: "Truy cập GPT-4o, DALL-E 3, Canvas, Code Interpreter và Advanced Voice Mode.",
    description: `### Giới thiệu ChatGPT Plus\nChatGPT Plus là dịch vụ AI số 1 thế giới giúp tăng năng suất làm việc gấp 10 lần.\n\n### Tính năng nổi bật:\n- Không giới hạn câu hỏi với GPT-4o và GPT-4.\n- Tạo ảnh với DALL-E 3 sắc nét.\n- Đọc hiểu tài liệu PDF, phân tích dữ liệu Excel.\n- Tính năng Canvas chỉnh sửa code và văn bản trực tiếp.`,
    categoryId: "cat-ai",
    category: fallbackCategories[0],
    type: "ACCOUNT",
    status: "ACTIVE",
    isFeatured: true,
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800"],
    badgeText: "Bán Chạy Nhất",
    rating: 4.9,
    totalSold: 1540,
    warrantyPolicy: "Bảo hành 1-đổi-1 full time trong suốt 30 ngày sử dụng.",
    instructionHtml: "<p>Đăng nhập tại chatgpt.com bằng email và mật khẩu được hệ thống gửi tự động.</p>",
    variants: [
      {
        id: "v-gpt-1m",
        productId: "p-chatgpt",
        name: "1 Tháng - Tài Khoản Cấp Sẵn",
        price: 499000,
        salePrice: 189000,
        stock: 45,
        deliveryType: "AUTO_ACCOUNT",
        durationDays: 30,
        sku: "GPT-1M-ACC",
      },
      {
        id: "v-gpt-3m",
        productId: "p-chatgpt",
        name: "3 Tháng - Tài Khoản Cấp Sẵn",
        price: 1400000,
        salePrice: 520000,
        stock: 25,
        deliveryType: "AUTO_ACCOUNT",
        durationDays: 90,
        sku: "GPT-3M-ACC",
      },
      {
        id: "v-gpt-upg",
        productId: "p-chatgpt",
        name: "1 Tháng - Nâng Cấp Email Cá Nhân",
        price: 520000,
        salePrice: 289000,
        stock: 40,
        deliveryType: "UPGRADE_LINK",
        durationDays: 30,
        sku: "GPT-1M-UPG",
      },
    ],
  },
  {
    id: "p-claude",
    name: "Tài Khoản Claude 3.5 Sonnet Pro",
    slug: "claude-3-5-sonnet-pro",
    shortDescription: "AI lập trình xuất sắc nhất với tính năng Artifacts và context 200k tokens.",
    description: `### Claude 3.5 Sonnet Pro\nTrợ lý AI số 1 cho Developer, Data Scientist và chuyên viên nội dung.\n\n### Điểm vượt trội:\n- Khả năng code chuẩn xác, tư duy logic cao nhất hiện nay.\n- Artifacts tạo ứng dụng React, SVG, Dashboard trực tiếp trên trình duyệt.`,
    categoryId: "cat-ai",
    category: fallbackCategories[0],
    type: "ACCOUNT",
    status: "ACTIVE",
    isFeatured: true,
    coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800"],
    badgeText: "HOT AI",
    rating: 5.0,
    totalSold: 890,
    warrantyPolicy: "Bảo hành 1-đổi-1 toàn diện.",
    instructionHtml: "<p>Đăng nhập tại claude.ai bằng email và mật khẩu được cấp.</p>",
    variants: [
      {
        id: "v-claude-1m",
        productId: "p-claude",
        name: "1 Tháng - Tài Khoản Cấp Sẵn",
        price: 520000,
        salePrice: 219000,
        stock: 35,
        deliveryType: "AUTO_ACCOUNT",
        durationDays: 30,
        sku: "CLAUDE-1M-ACC",
      },
    ],
  },
  {
    id: "p-canva",
    name: "Tài Khoản Canva Pro 1 Năm",
    slug: "canva-pro-1-nam",
    shortDescription: "Nâng cấp chính chủ email cá nhân. Mở khoá 100M+ mẫu thiết kế và tính năng Magic AI.",
    description: "Canva Pro giúp bạn tạo poster, banner, slide thuyết trình và video ngắn chuyên nghiệp chỉ trong vài phút.",
    categoryId: "cat-design",
    category: fallbackCategories[1],
    type: "UPGRADE",
    status: "ACTIVE",
    isFeatured: true,
    coverImage: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800"],
    badgeText: "Giá Siêu Rẻ",
    rating: 4.9,
    totalSold: 3200,
    warrantyPolicy: "Bảo hành 12 tháng, hỗ trợ kích hoạt lại nếu lỗi nhóm.",
    instructionHtml: "<p>Hệ thống sẽ gửi email mời tham gia đội nhóm Canva Pro tới email của bạn.</p>",
    variants: [
      {
        id: "v-canva-1y",
        productId: "p-canva",
        name: "1 Năm - Nâng Cấp Email Cá Nhân",
        price: 350000,
        salePrice: 149000,
        stock: 100,
        deliveryType: "UPGRADE_LINK",
        durationDays: 365,
        sku: "CANVA-1Y-UPG",
      },
    ],
  },
  {
    id: "p-win11",
    name: "Key Bản Quyền Windows 11 Pro",
    slug: "key-windows-11-pro",
    shortDescription: "Key Retail chính hãng kích hoạt online 1 PC vĩnh viễn, cập nhật trọn đời từ Microsoft.",
    description: "Kích hoạt bản quyền số Windows 11 Pro vĩnh viễn cho máy tính cá nhân hoặc laptop công việc.",
    categoryId: "cat-os",
    category: fallbackCategories[2],
    type: "CODE",
    status: "ACTIVE",
    isFeatured: true,
    coverImage: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800"],
    badgeText: "-75%",
    rating: 5.0,
    totalSold: 4100,
    warrantyPolicy: "Kích hoạt thành công 100%, bảo hành vĩnh viễn trên 1 bo mạch chủ.",
    instructionHtml: "<p>Vào Settings -> System -> Activation -> Change product key và nhập key được nhận.</p>",
    variants: [
      {
        id: "v-win11-key",
        productId: "p-win11",
        name: "Key 1 PC Vĩnh Viễn",
        price: 390000,
        salePrice: 99000,
        stock: 120,
        deliveryType: "AUTO_KEY",
        durationDays: 3650,
        sku: "WIN11-PRO-RETAIL",
      },
    ],
  },
  {
    id: "p-office365",
    name: "Tài Khoản Microsoft 365 + 1TB OneDrive",
    slug: "microsoft-365-1tb-onedrive",
    shortDescription: "Cài đặt Word, Excel, PowerPoint trên 5 máy tính + 1000GB lưu trữ đám mây an toàn.",
    description: "Trọn bộ ứng dụng văn phòng hiện đại nhất cùng kho lưu trữ OneDrive tốc độ cao.",
    categoryId: "cat-os",
    category: fallbackCategories[2],
    type: "ACCOUNT",
    status: "ACTIVE",
    isFeatured: true,
    coverImage: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800"],
    rating: 4.9,
    totalSold: 1890,
    warrantyPolicy: "Bảo hành 1 năm 1-đổi-1.",
    variants: [
      {
        id: "v-m365-1y",
        productId: "p-office365",
        name: "1 Năm - Tài Khoản Cấp Sẵn",
        price: 450000,
        salePrice: 179000,
        stock: 60,
        deliveryType: "AUTO_ACCOUNT",
        durationDays: 365,
        sku: "M365-1Y-ACC",
      },
    ],
  },
  {
    id: "p-duolingo",
    name: "Tài Khoản Duolingo Super 1 Năm",
    slug: "duolingo-super-1-nam",
    shortDescription: "Học ngoại ngữ không giới hạn trái tim, không quảng cáo, làm bài luyện chuyên sâu.",
    description: "Học ngoại ngữ mượt mà không lo hết mạng với Duolingo Super.",
    categoryId: "cat-learn",
    category: fallbackCategories[4],
    type: "UPGRADE",
    status: "ACTIVE",
    isFeatured: true,
    coverImage: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800"],
    rating: 4.9,
    totalSold: 1450,
    warrantyPolicy: "Bảo hành 365 ngày.",
    variants: [
      {
        id: "v-duo-1y",
        productId: "p-duolingo",
        name: "1 Năm - Gia Nhập Nhóm Học",
        price: 300000,
        salePrice: 159000,
        stock: 90,
        deliveryType: "UPGRADE_LINK",
        durationDays: 365,
        sku: "DUO-SUPER-1Y",
      },
    ],
  },
  {
    id: "p-youtube",
    name: "Tài Khoản YouTube Premium 1 Năm",
    slug: "youtube-premium-1-nam",
    shortDescription: "Xem video không quảng cáo, phát trong nền và thưởng thức YouTube Music Premium.",
    description: "Trải nghiệm YouTube mượt mà trên Smart TV, điện thoại, máy tính bảng không bị quảng cáo làm phiền.",
    categoryId: "cat-ent",
    category: fallbackCategories[6],
    type: "UPGRADE",
    status: "ACTIVE",
    isFeatured: true,
    coverImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800"],
    badgeText: "Cực Hot",
    rating: 4.9,
    totalSold: 4600,
    warrantyPolicy: "Bảo hành trọn gói 12 tháng.",
    variants: [
      {
        id: "v-ytb-1y",
        productId: "p-youtube",
        name: "1 Năm - Nâng Cấp Email Chính Chủ",
        price: 400000,
        salePrice: 249000,
        stock: 120,
        deliveryType: "UPGRADE_LINK",
        durationDays: 365,
        sku: "YTB-PREM-1Y",
      },
    ],
  },
  {
    id: "p-spotify",
    name: "Tài Khoản Spotify Premium 1 Năm",
    slug: "spotify-premium-1-nam",
    shortDescription: "Nghe nhạc chất lượng cao Lossless không quảng cáo trên mọi thiết bị.",
    description: "Thế giới âm nhạc bản quyền đỉnh cao kết nối mọi thiết bị.",
    categoryId: "cat-ent",
    category: fallbackCategories[6],
    type: "UPGRADE",
    status: "ACTIVE",
    isFeatured: true,
    coverImage: "https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=800&auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=800"],
    rating: 4.9,
    totalSold: 2100,
    warrantyPolicy: "Bảo hành 12 tháng.",
    variants: [
      {
        id: "v-spot-1y",
        productId: "p-spotify",
        name: "1 Năm - Email Chính Chủ",
        price: 360000,
        salePrice: 189000,
        stock: 80,
        deliveryType: "UPGRADE_LINK",
        durationDays: 365,
        sku: "SPOTIFY-1Y-UPG",
      },
    ],
  },
  {
    id: "p-nordvpn",
    name: "Tài Khoản NordVPN Cao Cấp",
    slug: "nordvpn-cao-cap",
    shortDescription: "VPN bảo mật hàng đầu thế giới, 6000+ máy chủ tốc độ cao, mã hoá quân đội.",
    description: "Bảo mật kết nối Internet và đổi địa chỉ IP truy cập nội dung toàn cầu.",
    categoryId: "cat-vpn",
    category: fallbackCategories[5],
    type: "ACCOUNT",
    status: "ACTIVE",
    isFeatured: true,
    coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800"],
    rating: 4.9,
    totalSold: 1100,
    warrantyPolicy: "Bảo hành 12 tháng.",
    variants: [
      {
        id: "v-nord-1y",
        productId: "p-nordvpn",
        name: "1 Năm - Dùng 6 Thiết Bị",
        price: 450000,
        salePrice: 199000,
        stock: 45,
        deliveryType: "AUTO_ACCOUNT",
        durationDays: 365,
        sku: "NORD-1Y-ACC",
      },
    ],
  },
];

/**
 * Lấy danh sách danh mục (Database kèm fallback)
 */
export async function getCategories(): Promise<MockCategory[]> {
  try {
    const cats = await prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
    });
    if (cats && cats.length > 0) {
      return cats.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description || "",
        icon: c.icon || "Package",
        isFeatured: c.isFeatured,
      }));
    }
  } catch (error) {
    // Database chưa kết nối -> dùng fallback
  }
  return fallbackCategories;
}

/**
 * Lấy danh sách sản phẩm theo bộ lọc (Search, Category, Sort)
 */
export async function getProducts(options?: {
  categorySlug?: string;
  query?: string;
  isFeatured?: boolean;
  limit?: number;
}): Promise<MockProduct[]> {
  try {
    const where: any = { status: "ACTIVE" };
    if (options?.categorySlug) {
      where.category = { slug: options.categorySlug };
    }
    if (options?.isFeatured !== undefined) {
      where.isFeatured = options.isFeatured;
    }
    if (options?.query) {
      where.OR = [
        { name: { contains: options.query, mode: "insensitive" } },
        { shortDescription: { contains: options.query, mode: "insensitive" } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        variants: {
          where: { isActive: true },
          orderBy: { sortOrder: "asc" },
        },
      },
      take: options?.limit,
      orderBy: { totalSold: "desc" },
    });

    if (products && products.length > 0) {
      return products as unknown as MockProduct[];
    }
  } catch (error) {
    // Fallback
  }

  let filtered = [...fallbackProducts];

  if (options?.categorySlug) {
    filtered = filtered.filter((p) => p.category?.slug === options.categorySlug);
  }

  if (options?.query) {
    const q = options.query.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q)
    );
  }

  if (options?.isFeatured !== undefined) {
    filtered = filtered.filter((p) => p.isFeatured === options.isFeatured);
  }

  if (options?.limit) {
    filtered = filtered.slice(0, options.limit);
  }

  return filtered;
}

/**
 * Lấy thông tin chi tiết một sản phẩm theo slug
 */
export async function getProductBySlug(slug: string): Promise<MockProduct | null> {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        variants: {
          where: { isActive: true },
          orderBy: { sortOrder: "asc" },
        },
        reviews: {
          where: { isApproved: true },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (product) {
      return product as unknown as MockProduct;
    }
  } catch (error) {
    // Fallback
  }

  const found = fallbackProducts.find((p) => p.slug === slug);
  return found || null;
}
