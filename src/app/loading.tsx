import { Loader2 } from "lucide-react";

export default function RootLoading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-3 bg-slate-50/50">
      <div className="w-12 h-12 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
      <p className="text-xs font-bold text-slate-500">Đang tải dữ liệu BestApp...</p>
    </div>
  );
}
