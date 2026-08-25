import Link from "next/link";
import Image from "next/image";
import { getBlogPosts, getBlogTopics } from "@/lib/blog-service";
import { BookOpen, Clock, User, ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Blog Hướng Dẫn & Kiến Thức Công Nghệ AI | BestApp.vn",
  description: "Tổng hợp hướng dẫn sử dụng ChatGPT Plus, Claude 3.5, Canva Pro, thủ thuật Windows và bảo mật phần mềm bản quyền.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const topics = await getBlogTopics();
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <div className="bg-slate-50/60 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Kiến Thức & Thủ Thuật Sản Phẩm Số</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Blog BestApp.vn
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Cập nhật tin tức công nghệ mới nhất về trí tuệ nhân tạo, tối ưu hoá máy tính và kinh nghiệm sử dụng phần mềm bản quyền.
          </p>
        </div>

        {/* Topics Filter */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 scrollbar-none justify-start sm:justify-center">
          <Link
            href="/blog"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-md shadow-blue-500/20"
          >
            Tất cả chủ đề
          </Link>
          {topics.map((t) => (
            <Link
              key={t.id}
              href={`/blog/topics/${t.slug}`}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              {t.name}
            </Link>
          ))}
        </div>

        {/* Featured Post Card */}
        {featuredPost && (
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group block bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 mb-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
              <div className="md:col-span-7 relative h-64 md:h-96 bg-slate-100 overflow-hidden">
                <Image
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>
              <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <Badge variant="hot" className="text-[10px] mb-3">
                    BÀI VIẾT NỔI BẬT
                  </Badge>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 mt-6">
                  <div className="flex items-center space-x-1.5 font-medium text-slate-600">
                    <User className="w-3.5 h-3.5 text-blue-600" />
                    <span>{featuredPost.authorName}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-blue-600 font-bold group-hover:translate-x-1 transition-transform">
                    <span>Đọc tiếp</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Other Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full h-48 bg-slate-100 overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                    {post.topic?.name || "Công nghệ"}
                  </span>
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-base mt-2.5 leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 mt-3 pt-3">
                <span className="text-[11px]">{new Date(post.publishedAt).toLocaleDateString("vi-VN")}</span>
                <span className="text-xs font-bold text-blue-600 flex items-center">
                  <span>Chi tiết</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
