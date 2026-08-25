import { HelpCircle, ChevronDown } from "lucide-react";

export const metadata = {
  title: "Câu Hỏi Thường Gặp (FAQ) | BestApp.vn",
  description: "Giải đáp các thắc mắc về thanh toán SePay QR, thời gian nhận hàng và bảo hành tài khoản số.",
};

export default function FAQPage() {
  const faqs = [
    {
      q: "Sau khi chuyển khoản bao lâu thì tôi nhận được tài khoản / key?",
      a: "Hệ thống BestApp hoạt động hoàn toàn tự động 24/7. Sau khi quét mã QR và chuyển khoản thành công, màn hình sẽ hiển thị thông tin bàn giao và gửi email cho bạn trong vòng 30 - 60 giây.",
    },
    {
      q: "Tôi có thể mua hàng mà không cần tạo tài khoản (Guest Checkout) không?",
      a: "Có! Bạn chỉ cần điền địa chỉ Email nhận hàng tại trang Thanh toán. Hệ thống sẽ tự động tạo mã đơn hàng và gửi key về email cho bạn.",
    },
    {
      q: "Tôi chuyển khoản nhưng quên hoặc ghi sai nội dung chuyển khoản thì sao?",
      a: "Đừng lo lắng! Hãy nhắn tin cho hỗ trợ viên qua Zalo kèm ảnh chụp biên lai chuyển tiền, kỹ thuật viên sẽ kích hoạt và bàn giao đơn hàng cho bạn ngay lập tức.",
    },
    {
      q: "Nếu tài khoản gặp lỗi trong quá trình sử dụng thì xử lý thế nào?",
      a: "BestApp cam kết bảo hành full time 1-đổi-1. Bạn chỉ cần vào mục Tra cứu đơn hàng hoặc nhắn tin Zalo kèm mã đơn hàng, chúng tôi sẽ cấp lại tài khoản mới.",
    },
  ];

  return (
    <div className="bg-slate-50/60 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Hỏi Đáp Thường Gặp</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Câu Hỏi Thường Gặp (FAQ)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Những điều bạn cần biết khi mua sắm sản phẩm số tại BestApp.vn
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2"
            >
              <h3 className="font-bold text-sm text-slate-900 flex items-start justify-between">
                <span>{f.q}</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pt-1 border-t border-slate-100">
                {f.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
