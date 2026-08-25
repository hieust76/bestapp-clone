import { NextRequest } from "next/server";
import { eventBus, AppEvent } from "@/lib/events";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId") || undefined;

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      // Gửi event khởi tạo kết nối
      const initMessage = `event: connected\ndata: ${JSON.stringify({
        status: "connected",
        userId,
        time: new Date().toISOString(),
      })}\n\n`;
      controller.enqueue(encoder.encode(initMessage));

      // Lắng nghe sự kiện từ Event Bus
      const onEvent = (event: AppEvent) => {
        // Chỉ gửi nếu là broadcast chung hoặc gửi đúng cho userId này
        if (!event.recipientUserId || event.recipientUserId === userId) {
          const sseData = `event: ${event.type}\ndata: ${JSON.stringify(event.data)}\n\n`;
          controller.enqueue(encoder.encode(sseData));
        }
      };

      eventBus.on("app_event", onEvent);

      // Heartbeat ping mỗi 15 giây giữ kết nối
      const heartbeatInterval = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(`: heartbeat\n\n`));
        } catch (e) {
          clearInterval(heartbeatInterval);
        }
      }, 15000);

      // Dọn dẹp khi client đóng tab/ngắt kết nối
      req.signal.addEventListener("abort", () => {
        clearInterval(heartbeatInterval);
        eventBus.off("app_event", onEvent);
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
