import { prisma } from "@/lib/prisma";

export interface MockTopic {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
}

export interface MockPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  topicId: string;
  topic?: MockTopic;
  authorName: string;
  isPublished: boolean;
  publishedAt: Date | string;
  readingTimeMinutes?: number;
}

export const fallbackTopics: MockTopic[] = [
  { id: "top-ai", name: "Hướng Dẫn & AI", slug: "huong-dan-ai", description: "Mẹo sử dụng ChatGPT, Midjourney, Claude..." },
  { id: "top-os", name: "Thủ Thuật Windows & Office", slug: "thu-thuat-windows-office", description: "Kích hoạt bản quyền và tối ưu hoá hệ điều hành" },
  { id: "top-security", name: "Bảo Mật & VPN", slug: "bao-mat-vpn", description: "Bảo vệ danh tính và dữ liệu số trên Internet" },
];

export const fallbackPosts: MockPost[] = [
  {
    id: "post-1",
    title: "Top 5 Lý Do Nên Sử Dụng Claude 3.5 Sonnet Để Lập Trình Thay Cho GPT-4o",
    slug: "top-5-ly-do-su-dung-claude-3-5-sonnet",
    excerpt: "Phân tích chi tiết khả năng xử lý code và tính năng Artifacts đột phá của Claude 3.5 Sonnet giúp tăng 200% hiệu suất lập trình.",
    content: `## 1. Khả năng tư duy logic và giải quyết thuật toán đỉnh cao
Claude 3.5 Sonnet hiện đang đứng đầu hầu hết các bảng xếp hạng benchmark về Coding (SWE-bench Verified) vượt qua GPT-4o và Gemini 1.5 Pro.

## 2. Tính năng Artifacts tương tác trực tiếp
Với Artifacts, bạn có thể xem trực tiếp giao diện React, component Tailwind CSS, biểu đồ Mermaid và tài liệu SVG được render ngay trên màn hình chat mà không cần chuyển sang IDE.

## 3. Cửa sổ ngữ cảnh 200K Tokens
Dễ dàng ném toàn bộ codebase hàng chục file vào để Claude đọc hiểu và phát hiện bug chỉ trong vài giây.

## 4. Viết code sạch, ít lỗi hallucination
Khác với các mô hình thế hệ trước, Claude 3.5 tuân thủ cấu trúc thư mục và quy chuẩn TypeScript rất nghiêm ngặt.

## 5. Giá thành tiết kiệm khi mua tại BestApp.vn
Chỉ từ 219.000đ/tháng để sở hữu tài khoản Claude 3.5 Pro cấp phát tự động trong 1 phút!`,
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    topicId: "top-ai",
    topic: fallbackTopics[0],
    authorName: "BestApp Tech Team",
    isPublished: true,
    publishedAt: new Date().toISOString(),
    readingTimeMinutes: 4,
  },
  {
    id: "post-2",
    title: "Hướng Dẫn Kích Hoạt Bản Quyền Windows 11 Pro Vĩnh Viễn Trong 3 Bước",
    slug: "huong-dan-kich-hoat-windows-11-pro",
    excerpt: "Cách nhập Product Key Retail chính hãng để kích hoạt Windows 11 Pro online thành công 100% không lo bị mất bản quyền khi update.",
    content: `## Hướng dẫn nhập key Windows 11 Pro
1. Mở menu **Settings** trên máy tính (hoặc nhấn phím Windows + I).
2. Chọn mục **System** -> Chọn **Activation**.
3. Bấm vào **Change product key** và dán mã key nhận được từ BestApp.vn -> Bấm **Next** -> **Activate**.

Chỉ trong 5 giây, máy tính của bạn sẽ hiển thị dòng chữ *Windows is activated with a digital license*!`,
    coverImage: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80",
    topicId: "top-os",
    topic: fallbackTopics[1],
    authorName: "Chuyên viên Kỹ thuật",
    isPublished: true,
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    readingTimeMinutes: 3,
  },
  {
    id: "post-3",
    title: "Canva Pro: 7 Tính Năng Magic AI Giúp Thiết Kế Banner Siêu Tốc Cho Dân Bán Hàng",
    slug: "canva-pro-7-tinh-nang-magic-ai",
    excerpt: "Khám phá sức mạnh của Magic Eraser, Magic Switch, Magic Media trong Canva Pro giúp tạo ảnh quảng cáo chuyên nghiệp trong 30 giây.",
    content: `Canva Pro mở khoá toàn bộ công cụ Magic Studio đột phá:
- **Magic Switch**: Đổi kích thước bài đăng Facebook sang Story Instagram, Poster khổ dọc 1-click.
- **Magic Eraser**: Xoá vật thể thừa, xoá phông nền tự động sạch bóng.
- **Magic Write**: Viết tiêu đề, caption bán hàng cực cuốn hút theo giọng văn tuỳ chọn.`,
    coverImage: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&auto=format&fit=crop&q=80",
    topicId: "top-ai",
    topic: fallbackTopics[0],
    authorName: "Canva Creator",
    isPublished: true,
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    readingTimeMinutes: 5,
  },
];

export async function getBlogTopics(): Promise<MockTopic[]> {
  try {
    const topics = await prisma.blogTopic.findMany();
    if (topics && topics.length > 0) return topics;
  } catch (e) {}
  return fallbackTopics;
}

export async function getBlogPosts(topicSlug?: string): Promise<MockPost[]> {
  try {
    const where: any = { isPublished: true };
    if (topicSlug) {
      where.topic = { slug: topicSlug };
    }
    const posts = await prisma.blogPost.findMany({
      where,
      include: { topic: true },
      orderBy: { createdAt: "desc" },
    });
    if (posts && posts.length > 0) return posts as unknown as MockPost[];
  } catch (e) {}

  if (topicSlug) {
    return fallbackPosts.filter((p) => p.topic?.slug === topicSlug);
  }
  return fallbackPosts;
}

export async function getBlogPostBySlug(slug: string): Promise<MockPost | null> {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: { topic: true },
    });
    if (post) return post as unknown as MockPost;
  } catch (e) {}

  return fallbackPosts.find((p) => p.slug === slug) || null;
}
