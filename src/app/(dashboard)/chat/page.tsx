"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Send,
  Paperclip,
  Image as ImageIcon,
  FileCode,
  Building2,
  Printer,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Clock,
  DollarSign,
  Lock,
  FileText,
  X,
  Loader2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatVND } from "@/lib/utils";
import { useNotifications } from "@/hooks/useNotifications";
import { sendMessageAction } from "@/actions/chat-actions";
import { createContractAction, respondToContractAction } from "@/actions/contract-actions";
import { simulateEscrowPaymentAction } from "@/actions/escrow-actions";

export default function ChatPage() {
  const [activeTab, setActiveTab] = useState("conv-1");
  const [inputMessage, setInputMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [isEscrowModalOpen, setIsEscrowModalOpen] = useState(false);

  // Active user role simulation (can be toggled for demo test)
  const [demoUserRole, setDemoUserRole] = useState<"CUSTOMER" | "WORKSHOP">("CUSTOMER");
  const userId = demoUserRole === "CUSTOMER" ? "user-customer-id" : "user-workshop-id";

  // Contract form states
  const [finalPrice, setFinalPrice] = useState("450000");
  const [depositPercent, setDepositPercent] = useState(50);
  const [estimatedDays, setEstimatedDays] = useState(2);
  const [materialUsed, setMaterialUsed] = useState("PETG Đen mờ (Chịu nhiệt, chống nước)");
  const [qualityNotes, setQualityNotes] = useState("Cam kết dung sai < 0.2mm, xử lý support sạch sẽ, sấy UV");

  // Mock Conversations & Messages State
  const [conversation, setConversation] = useState({
    id: "conv-1",
    project: {
      id: "proj-1",
      code: "PRJ-902184",
      title: "In vỏ hộp cảm biến IoT chống nước ngoài trời (5 bộ)",
      material: "PETG Đen mờ",
      quantity: 5,
      budget: 450000,
      customerName: "Nguyễn Thành Long (Khách hàng)",
      printerName: "3D Hub Sài Gòn (Xưởng in)",
      status: "ASSIGNED",
    },
    contract: null as any,
    messages: [
      {
        id: "m-1",
        senderRole: "WORKSHOP",
        senderName: "3D Hub Sài Gòn",
        content: "Chào bạn Long! Xưởng mình đã nhận đơn in vỏ hộp cảm biến IoT của bạn. Mình vừa kiểm tra file STL đính kèm, kích thước thành 3mm rất đẹp và đạt tiêu chuẩn chống nước.",
        createdAt: "19:32",
        attachmentUrl: null,
      },
      {
        id: "m-2",
        senderRole: "CUSTOMER",
        senderName: "Nguyễn Thành Long",
        content: "Chào xưởng! Cho mình hỏi bạn dùng máy gì để in và có sấy nhựa trước khi in không ạ? Vì mình cần dùng ngoài trời.",
        createdAt: "19:35",
        attachmentUrl: null,
      },
      {
        id: "m-3",
        senderRole: "WORKSHOP",
        senderName: "3D Hub Sài Gòn",
        content: "Bên mình dùng Bambu Lab X1-Carbon có buồng sấy kín, nhựa PETG eSun sấy 60°C trong 8 tiếng đảm bảo không bị bọt khí hay giòn. Mình gửi bạn Hợp đồng điện tử chốt giá 450.000đ cho 5 bộ nhé!",
        createdAt: "19:38",
        attachmentUrl: null,
      },
    ],
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation.messages]);

  // Hook SSE Real-time listening
  useNotifications(userId, {
    onNewMessage: (data) => {
      if (data.conversationId === conversation.id) {
        setConversation((prev) => ({
          ...prev,
          messages: [
            ...prev.messages,
            {
              id: `msg-${Date.now()}`,
              senderRole: data.message?.sender?.role || "WORKSHOP",
              senderName: data.message?.sender?.name || "Đối tác",
              content: data.message?.content || "",
              createdAt: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
              attachmentUrl: data.message?.attachmentUrl || null,
            },
          ],
        }));
      }
    },
    onContractUpdate: (data) => {
      setConversation((prev) => ({
        ...prev,
        contract: data.contract,
      }));
    },
    onEscrowUpdate: (data) => {
      setConversation((prev) => ({
        ...prev,
        contract: prev.contract ? { ...prev.contract, status: "PAID_ESCROW" } : null,
      }));
    },
  });

  // Handle Send Message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg = {
      id: `m-${Date.now()}`,
      senderRole: demoUserRole,
      senderName: demoUserRole === "CUSTOMER" ? "Nguyễn Thành Long" : "3D Hub Sài Gòn",
      content: inputMessage.trim(),
      createdAt: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
      attachmentUrl: null,
    };

    setConversation((prev) => ({
      ...prev,
      messages: [...prev.messages, newMsg],
    }));

    const textToSend = inputMessage.trim();
    setInputMessage("");

    startTransition(async () => {
      await sendMessageAction(conversation.id, userId, textToSend);
    });
  };

  // Handle Create Contract
  const handleCreateContract = (e: React.FormEvent) => {
    e.preventDefault();
    const contractCode = `HD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newContract = {
      contractCode,
      finalPrice: Number(finalPrice),
      depositAmount: Math.round((Number(finalPrice) * depositPercent) / 100),
      estimatedDays,
      materialUsed,
      qualityNotes,
      status: "SENT_TO_CUSTOMER",
    };

    setConversation((prev) => ({
      ...prev,
      contract: newContract,
      messages: [
        ...prev.messages,
        {
          id: `m-${Date.now()}`,
          senderRole: "WORKSHOP",
          senderName: "3D Hub Sài Gòn",
          content: `📄 [HỢP ĐỒNG ĐIỆN TỬ]: Đã tạo hợp đồng ${contractCode} (Giá chốt: ${Number(finalPrice).toLocaleString("vi-VN")}đ, cọc ${depositPercent}%). Vui lòng xác nhận và nạp tiền ký quỹ Escrow.`,
          createdAt: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
          attachmentUrl: null,
        },
      ],
    }));

    setIsContractModalOpen(false);

    startTransition(async () => {
      const formData = new FormData();
      formData.append("projectId", conversation.project.id);
      formData.append("finalPrice", finalPrice);
      formData.append("depositPercent", String(depositPercent));
      formData.append("estimatedDays", String(estimatedDays));
      formData.append("materialUsed", materialUsed);
      formData.append("qualityNotes", qualityNotes);
      await createContractAction(formData);
    });
  };

  // Handle Simulate Escrow Payment
  const handleSimulatePayment = () => {
    startTransition(async () => {
      if (conversation.contract) {
        await simulateEscrowPaymentAction(conversation.contract.contractCode);
        setConversation((prev) => ({
          ...prev,
          contract: { ...prev.contract, status: "PAID_ESCROW" },
          messages: [
            ...prev.messages,
            {
              id: `m-${Date.now()}`,
              senderRole: "CUSTOMER",
              senderName: "Hệ thống Escrow",
              content: `🛡️ [ESCROW CONFIRMED]: Khách hàng đã nạp thành công ${conversation.contract.depositAmount?.toLocaleString("vi-VN")}đ vào quỹ Escrow bảo đảm. Xưởng in được cấp phép bắt đầu in!`,
              createdAt: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
              attachmentUrl: null,
            },
          ],
        }));
      }
      setIsEscrowModalOpen(false);
    });
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-6">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Demo Switch Role Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 mb-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-slate-400">Đang thử nghiệm góc nhìn:</span>
            <button
              onClick={() => setDemoUserRole("CUSTOMER")}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                demoUserRole === "CUSTOMER" ? "bg-blue-600 text-white" : "bg-slate-950 text-slate-400"
              }`}
            >
              Khách Hàng (Customer)
            </button>
            <button
              onClick={() => setDemoUserRole("WORKSHOP")}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                demoUserRole === "WORKSHOP" ? "bg-purple-600 text-white" : "bg-slate-950 text-slate-400"
              }`}
            >
              Xưởng In 3D (Workshop)
            </button>
          </div>

          <div className="flex items-center space-x-2 text-emerald-400 font-medium text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>SSE Real-time Connected</span>
          </div>
        </div>

        {/* Main Chat Layout Container */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 min-h-[640px]">
          {/* Left Panel: Conversations List */}
          <div className="md:col-span-4 border-r border-slate-800 bg-slate-950/60 p-4 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h3 className="font-black text-sm text-white flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2 text-blue-400" />
                  <span>Tin Nhắn Dự Án (1)</span>
                </h3>
              </div>

              {/* Active Conversation Card */}
              <div
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  activeTab === "conv-1"
                    ? "bg-slate-900 border-blue-500/50 shadow-md"
                    : "bg-slate-950 border-slate-800/80 hover:bg-slate-900"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-xs">
                        {demoUserRole === "CUSTOMER" ? "3D Hub Sài Gòn" : "Nguyễn Thành Long"}
                      </p>
                      <p className="font-mono text-[10px] text-blue-400">{conversation.project.code}</p>
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>

                <p className="text-[11px] text-slate-300 mt-2 line-clamp-1">
                  {conversation.project.title}
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <span className="font-bold text-slate-300 flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                Bảo vệ bởi In3DHub Escrow
              </span>
              <p>Mọi giao dịch thanh toán và cam kết chất lượng đều được đảm bảo thông qua Hợp đồng điện tử.</p>
            </div>
          </div>

          {/* Right Panel: Chat Room Header & Message Thread */}
          <div className="md:col-span-8 flex flex-col justify-between bg-slate-900/40">
            {/* Chat Room Header */}
            <div className="p-4 border-b border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                  {demoUserRole === "CUSTOMER" ? <Building2 className="w-5 h-5" /> : <Printer className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">
                    {demoUserRole === "CUSTOMER" ? "3D Hub Sài Gòn" : "Nguyễn Thành Long (Khách hàng)"}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Dự án: <b className="text-slate-200">{conversation.project.title}</b>
                  </p>
                </div>
              </div>

              {/* Action Buttons in Header */}
              <div className="flex items-center space-x-2">
                {demoUserRole === "WORKSHOP" && (
                  <Button
                    onClick={() => setIsContractModalOpen(true)}
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl h-9 shadow-md"
                  >
                    <FileText className="w-3.5 h-3.5 mr-1.5" />
                    <span>Tạo Hợp Đồng Điện Tử</span>
                  </Button>
                )}
              </div>
            </div>

            {/* Electronic Contract Banner inside Chat (if exists) */}
            {conversation.contract && (
              <div className="p-4 mx-4 mt-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-blue-950/40 border border-purple-500/40 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-purple-500/20 pb-2">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-purple-400" />
                    <span className="font-bold text-white text-xs">
                      Hợp Đồng In 3D: {conversation.contract.contractCode}
                    </span>
                  </div>
                  <Badge
                    className={
                      conversation.contract.status === "PAID_ESCROW"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-[10px]"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/30 text-[10px]"
                    }
                  >
                    {conversation.contract.status === "PAID_ESCROW"
                      ? "🛡️ Đã Ký Quỹ Escrow - Đang In"
                      : "Chờ Khách Thanh Toán Cọc"}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-300">
                  <div>
                    <span className="text-slate-500 text-[10px] block">Giá chốt:</span>
                    <span className="font-bold text-white">{formatVND(conversation.contract.finalPrice)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">Tiền cọc Escrow:</span>
                    <span className="font-black text-amber-400">{formatVND(conversation.contract.depositAmount)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">Vật liệu:</span>
                    <span className="font-semibold text-white">{conversation.contract.materialUsed}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">Thời gian:</span>
                    <span className="font-semibold text-emerald-400">{conversation.contract.estimatedDays} ngày</span>
                  </div>
                </div>

                {/* Customer Action to Pay Escrow */}
                {demoUserRole === "CUSTOMER" && conversation.contract.status !== "PAID_ESCROW" && (
                  <div className="pt-2 flex gap-2">
                    <Button
                      onClick={() => setIsEscrowModalOpen(true)}
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl h-9 shadow-lg shadow-emerald-600/20"
                    >
                      <Lock className="w-3.5 h-3.5 mr-1" />
                      <span>Đồng Ý &amp; Nạp Tiền Ký Quỹ Escrow ({formatVND(conversation.contract.depositAmount)})</span>
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Message Thread History */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[420px]">
              {conversation.messages.map((msg) => {
                const isMe = msg.senderRole === demoUserRole;

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                  >
                    <span className="text-[10px] text-slate-500 mb-1 px-1">
                      {msg.senderName} • {msg.createdAt}
                    </span>
                    <div
                      className={`p-3.5 rounded-2xl max-w-md text-xs leading-relaxed ${
                        isMe
                          ? "bg-blue-600 text-white rounded-tr-none shadow-md shadow-blue-600/20"
                          : "bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700/80"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input Bar */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-800 bg-slate-950 flex items-center space-x-2">
              <button
                type="button"
                className="p-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                title="Đính kèm file 3D / Hình ảnh"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Nhập tin nhắn trao đổi kỹ thuật, kích thước, tiến độ..."
                className="flex-1 bg-slate-900 border-slate-800 text-white text-xs h-11 rounded-xl"
              />

              <Button
                type="submit"
                disabled={isPending || !inputMessage.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 px-5 rounded-xl text-xs shadow-lg shadow-blue-500/20"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Contract Creation Modal (For Workshop) */}
      {isContractModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 text-xs text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-purple-400" />
                <h3 className="font-black text-sm text-white">Tạo Hợp Đồng Điện Tử (Alibaba-Style)</h3>
              </div>
              <button onClick={() => setIsContractModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateContract} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Giá chốt cuối cùng (VND) *</label>
                  <Input
                    required
                    type="number"
                    value={finalPrice}
                    onChange={(e) => setFinalPrice(e.target.value)}
                    className="bg-slate-950 border-slate-800 text-white h-10 text-xs rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">% Cọc Escrow (Mặc định 50%)</label>
                  <select
                    value={depositPercent}
                    onChange={(e) => setDepositPercent(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold"
                  >
                    <option value={30}>30% cọc</option>
                    <option value={50}>50% cọc (Khuyên dùng)</option>
                    <option value={100}>100% thanh toán trước</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Vật liệu cam kết</label>
                  <Input
                    value={materialUsed}
                    onChange={(e) => setMaterialUsed(e.target.value)}
                    className="bg-slate-950 border-slate-800 text-white h-10 text-xs rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Thời gian in xong</label>
                  <Input
                    type="number"
                    value={estimatedDays}
                    onChange={(e) => setEstimatedDays(Number(e.target.value))}
                    className="bg-slate-950 border-slate-800 text-white h-10 text-xs rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Cam kết dung sai &amp; Hậu mãi</label>
                <textarea
                  rows={2}
                  value={qualityNotes}
                  onChange={(e) => setQualityNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>

              <div className="p-3 bg-purple-950/30 border border-purple-500/30 rounded-2xl text-[11px] text-purple-200">
                Khi gửi, hệ thống tự động khóa cam kết và gửi thông báo mời khách hàng nạp cọc vào quỹ Escrow an toàn.
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 font-bold text-xs h-11 rounded-xl"
              >
                Phát Hành Hợp Đồng Đến Khách Hàng
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Escrow Payment Simulator Modal (For Customer) */}
      {isEscrowModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 text-xs text-slate-100 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-black text-white">Thanh Toán Ký Quỹ Escrow</h3>
              <p className="text-slate-400 text-xs mt-1">
                Số tiền cọc: <b className="text-emerald-400 text-sm">{formatVND(conversation.contract?.depositAmount || 225000)}</b>
              </p>
            </div>

            {/* QR Mock */}
            <div className="p-4 bg-white rounded-2xl inline-block mx-auto border-4 border-blue-500/20">
              <div className="w-40 h-40 bg-slate-100 flex flex-col items-center justify-center text-slate-900 space-y-1">
                <span className="font-black text-xs">VietQR / SePay</span>
                <span className="font-mono text-[10px] text-slate-600">{conversation.contract?.contractCode}</span>
                <div className="w-24 h-24 bg-slate-900 rounded-lg flex items-center justify-center text-white text-[9px]">
                  [QR Transfer]
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              Chuyển khoản theo mã hợp đồng hoặc bấm nút giả lập bên dưới để kích hoạt ngay:
            </p>

            <Button
              onClick={handleSimulatePayment}
              disabled={isPending}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 rounded-xl text-xs shadow-lg shadow-emerald-500/25"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "⚡ Giả Lập Đã Chuyển Khoản Thành Công"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
