import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blog-service";
import { ChevronRight, Home, User, Calendar, Clock, ArrowLeft, Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Bài viết không tồn tại - BestApp.vn" };
  }

  return {
    title: `${post.title} | BestApp.vn Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      type: "article",
      publishedTime: new Date(post.publishedAt).toISOString(),
    },
  };
}

export default async function BlogPostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = (await getBlogPosts()).filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="bg-slate-50/60 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-blue-600 flex items-center">
            <Home className="w-3.5 h-3.5 mr-1" />
            <span>Trang chủ</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/blog" className="hover:text-blue-600">
            Blog
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-slate-900 truncate max-w-[200px]">
            {post.title}
          </span>
        </nav>

        {/* Article Container */}
        <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          {/* Category & Title */}
          <div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {post.topic?.name || "Kiến thức công nghệ"}
            </span>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight mt-3">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-4 pt-3 border-t border-slate-100">
              <div className="flex items-center space-x-1.5 font-semibold text-slate-800">
                <User className="w-3.5 h-3.5 text-blue-600" />
                <span>{post.authorName}</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{new Date(post.publishedAt).toLocaleDateString("vi-VN")}</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{post.readingTimeMinutes || 4} phút đọc</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden bg-slate-100">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 800px"
            />
          </div>

          {/* Excerpt Lead */}
          <p className="text-sm sm:text-base font-semibold text-slate-700 leading-relaxed italic border-l-4 border-blue-600 pl-4 py-1 bg-slate-50/70 rounded-r-xl">
            {post.excerpt}
          </p>

          {/* Article Content */}
          <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed space-y-4 pt-2">
            <div className="whitespace-pre-line text-slate-800">
              {post.content}
            </div>
          </div>

          {/* Promo CTA Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h3 className="font-bold text-base">Cần mua tài khoản bản quyền giá rẻ?</h3>
              <p className="text-xs text-blue-100 mt-1">
                Giao hàng tự động trong 1 phút, bảo hành full time 1-đổi-1 tại BestApp.vn.
              </p>
            </div>
            <Link
              href="/shop"
              className="px-5 py-2.5 rounded-xl bg-white text-blue-600 font-bold text-xs hover:bg-blue-50 transition-colors shrink-0 shadow-md"
            >
              Khám phá sản phẩm
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
