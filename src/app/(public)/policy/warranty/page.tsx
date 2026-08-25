import { ShieldCheck, CheckCircle2, RotateCcw } from "lucide-react";

export const metadata = {
  title: "Chính Sách Bảo Hành & Cam Kết 1-Đổi-1 | BestApp.vn",
  description: "Quy định bảo hành toàn diện cho tài khoản số và license key tại BestApp.vn.",
};

export default function WarrantyPolicyPage() {
  return (
    <div className="bg-slate-50/60 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Chính Sách Bảo Hành & Đổi Trả
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Cập nhật lần cuối: 25/08/2026
              </p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed space-y-4 text-slate-700">
            <h3 className="text-base font-bold text-slate-900">1. Cam kết bảo hành 1-đổi-1</h3>
            <p>
              Tại <b>BestApp.vn</b>, chúng tôi cam kết bảo hành 1-đổi-1 trong suốt thời hạn của gói dịch vụ bạn đã mua đối với tất cả các lỗi phát sinh từ phía hệ thống hoặc nhà cung cấp.
            </p>

            <h3 className="text-base font-bold text-slate-900">2. Thời gian xử lý sự cố</h3>
            <p>
              - Kỹ thuật viên sẽ hỗ trợ kiểm tra và cấp lại tài khoản / key mới trong vòng <b>5 - 15 phút</b> khi liên hệ qua kênh Zalo hoặc Telegram hỗ trợ.
            </p>

            <h3 className="text-base font-bold text-slate-900">3. Trường hợp được bảo hành</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Tài khoản không đăng nhập được ngay sau khi nhận.</li>
              <li>Tài khoản bị mất gói Plus / Pro trước khi hết hạn sử dụng.</li>
              <li>Key Windows / Office báo lỗi không thể kích hoạt online.</li>
            </ul>

            <h3 className="text-base font-bold text-slate-900">4. Chính sách hoàn tiền 100%</h3>
            <p>
              Nếu sản phẩm bị lỗi trong vòng 3 ngày đầu tiên và chúng tôi không thể cấp đổi giải pháp thay thế tương đương, quý khách sẽ được hoàn tiền 100% về tài khoản ngân hàng.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
