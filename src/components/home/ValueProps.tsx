import { Zap, ShieldCheck, Tag, Headphones } from "lucide-react";

export function ValueProps() {
  const props = [
    {
      icon: Zap,
      color: "text-amber-500 bg-amber-50 border-amber-100",
      title: "Cấp Phát Tự Động 24/7",
      desc: "Hệ thống bàn giao tài khoản & key tức thì trong vòng 1 phút sau thanh toán",
    },
    {
      icon: Tag,
      color: "text-blue-600 bg-blue-50 border-blue-100",
      title: "Giá Tiết Kiệm Đến 80%",
      desc: "Chính sách giá sỉ ưu đãi tốt nhất thị trường cho cá nhân và doanh nghiệp",
    },
    {
      icon: ShieldCheck,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
      title: "Bảo Hành Full Time 1-1",
      desc: "Đổi mới lập tức hoặc hoàn tiền 100% nếu phát sinh sự cố trong quá trình sử dụng",
    },
    {
      icon: Headphones,
      color: "text-purple-600 bg-purple-50 border-purple-100",
      title: "Hỗ Trợ Nhanh 8h - 23h",
      desc: "Đội ngũ kỹ thuật viên am hiểu công nghệ hỗ trợ nhiệt tình qua Zalo & Telegram",
    },
  ];

  return (
    <section className="py-6 border-b border-slate-200/80 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {props.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start space-x-3.5 p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all"
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${item.color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800">{item.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
