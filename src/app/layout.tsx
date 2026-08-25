import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "BestApp.vn - Mua Tài Khoản AI & Phần Mềm Bản Quyền Tự Động 24/7",
  description:
    "Nền tảng mua sắm sản phẩm số, tài khoản ChatGPT Plus, Canva Pro, Windows 11, Office 365, Spotify... Tự động giao hàng trong 1 phút qua SePay QR, bảo hành full time 1-đổi-1.",
  keywords: [
    "bestapp",
    "mua chatgpt plus",
    "canva pro gia re",
    "key windows 11",
    "tai khoan claude pro",
    "san pham so",
    "phan mem ban quyen",
    "giao tu dong",
  ],
  authors: [{ name: "BestApp Digital Team" }],
  openGraph: {
    title: "BestApp.vn - Tài Khoản AI & Phần Mềm Bản Quyền Tự Động",
    description:
      "Giao dịch tự động 24/7 trong 1 phút qua SePay QR, bảo hành uy tín 1-đổi-1, tiết kiệm đến 80%.",
    type: "website",
    locale: "vi_VN",
    siteName: "BestApp.vn",
  },
};

import { OrganizationJsonLd } from "@/components/seo/JsonLd";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={jakartaSans.variable}>
      <head>
        <OrganizationJsonLd />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
