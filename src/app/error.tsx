"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App Error Boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center bg-slate-50/50">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Đã xảy ra sự cố!</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          Hệ thống gặp lỗi không mong muốn khi xử lý yêu cầu. Bạn có thể thử tải lại trang hoặc quay về trang chủ.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
          <Button
            onClick={() => reset()}
            className="w-full sm:w-auto flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-10"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            <span>Thử lại</span>
          </Button>
          <Link href="/" className="w-full sm:w-auto flex-1">
            <Button
              variant="outline"
              className="w-full rounded-xl border-slate-300 text-slate-700 font-bold text-xs h-10"
            >
              <Home className="w-3.5 h-3.5 mr-1.5" />
              <span>Về trang chủ</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
