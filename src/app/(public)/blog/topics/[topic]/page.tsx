import Link from "next/link";
import Image from "next/image";
import { getBlogPosts, getBlogTopics } from "@/lib/blog-service";
import { ChevronRight, Home, ArrowRight, BookOpen } from "lucide-react";
import { notFound } from "next/navigation";

export const revalidate = 60;

export default async function BlogTopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const topics = await getBlogTopics();
  const currentTopic = topics.find((t) => t.slug === topic);

  if (!currentTopic) {
    notFound();
  }

  const posts = await getBlogPosts(topic);

  return (
    <div className="bg-slate-50/60 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl">
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
          <span className="font-bold text-slate-900">{currentTopic.name}</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Chủ đề: {currentTopic.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            {currentTopic.description || "Tổng hợp các bài viết hữu ích."}
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
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
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-base leading-snug line-clamp-2">
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
