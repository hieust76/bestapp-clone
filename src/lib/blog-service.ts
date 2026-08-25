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
  { id: "top-fdm", name: "Công Nghệ In FDM & Vật Liệu", slug: "cong-nghe-fdm", description: "Mẹo in PLA, PETG, ABS, TPU không cong vênh" },
  { id: "top-resin", name: "In Quang Hóa SLA Resin 8K", slug: "in-sla-resin", description: "Bí quyết in Figure anime, trang sức độ mịn cao" },
  { id: "top-design", name: "Thiết Kế 3D Chuẩn In (DFAM)", slug: "thiet-ke-chuan-in-3d", description: "Tối ưu hóa file STL, giảm support, tiết kiệm chi phí" },
];

export const fallbackPosts: MockPost[] = [
  {
    id: "post-1",
    title: "So Sánh In 3D FDM vs SLA Resin: Khi Nào Nên Dùng Công Nghệ Nào?",
    slug: "so-sanh-in-3d-fdm-va-sla-resin",
    excerpt: "Phân tích chi tiết giữa in sợi nhựa FDM (Bambu Lab, Prusa) và in quang hoá Resin 8K/12K về độ bền, độ mịn và giá thành.",
    content: `## 1. Công nghệ FDM (Fused Deposition Modeling)
FDM là công nghệ đùn sợi nhựa nóng chảy qua đầu đùn. 
- **Ưu điểm**: Giá thành rẻ, kích thước in lớn (lên tới 300 - 500mm), vật liệu đa dạng và chịu lực cực tốt (PETG, ABS, Carbon Fiber).
- **Phù hợp**: Vỏ hộp linh kiện, đồ gá kỹ thuật, phụ kiện xe, cosplay.

## 2. Công nghệ SLA/DLP Resin
Sử dụng tia laser hoặc màn hình LCD chiếu tia UV làm đông cứng nhựa lỏng từng lớp.
- **Ưu điểm**: Độ mịn siêu cao (lớp in 0.02 - 0.05mm), không lộ vân in, độ sắc nét tuyệt đối.
- **Phù hợp**: Tượng Anime/Figure, trang sức đúc khuôn, mẫu răng hàm mặt.`,
    coverImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800",
    topicId: "top-fdm",
    topic: fallbackTopics[0],
    authorName: "In3DHub Tech Team",
    isPublished: true,
    publishedAt: new Date().toISOString(),
    readingTimeMinutes: 4,
  },
];

export async function getBlogTopics(): Promise<MockTopic[]> {
  return fallbackTopics;
}

export async function getBlogPosts(topicSlug?: string): Promise<MockPost[]> {
  if (topicSlug) {
    return fallbackPosts.filter((p) => p.topic?.slug === topicSlug);
  }
  return fallbackPosts;
}

export async function getBlogPostBySlug(slug: string): Promise<MockPost | null> {
  return fallbackPosts.find((p) => p.slug === slug) || null;
}
