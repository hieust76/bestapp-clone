"use client";

import { useEffect, useState, useCallback } from "react";

export interface NotificationItem {
  id: string;
  title: string;
  content: string;
  link?: string;
  createdAt: string;
  isRead: boolean;
}

export function useNotifications(
  userId?: string,
  callbacks?: {
    onNewJob?: (data: any) => void;
    onJobClaimed?: (data: any) => void;
    onNewMessage?: (data: any) => void;
    onContractUpdate?: (data: any) => void;
    onEscrowUpdate?: (data: any) => void;
  }
) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const url = userId
      ? `/api/notifications/stream?userId=${encodeURIComponent(userId)}`
      : `/api/notifications/stream`;

    const eventSource = new EventSource(url);

    eventSource.onopen = () => {
      setIsConnected(true);
    };

    eventSource.onerror = () => {
      setIsConnected(false);
    };

    // Lắng nghe các event từ SSE
    eventSource.addEventListener("connected", () => {
      setIsConnected(true);
    });

    eventSource.addEventListener("NEW_JOB", (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data);
        callbacks?.onNewJob?.(data);

        setNotifications((prev) => [
          {
            id: `notif-${Date.now()}`,
            title: data.title || "🔔 Đơn in 3D mới gần bạn!",
            content: data.content || "Có khách hàng vừa tạo yêu cầu in 3D trong khu vực của bạn.",
            link: "/printer/available-jobs",
            createdAt: new Date().toLocaleTimeString("vi-VN"),
            isRead: false,
          },
          ...prev,
        ]);
        setUnreadCount((c) => c + 1);
      } catch (err) {}
    });

    eventSource.addEventListener("JOB_CLAIMED", (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data);
        callbacks?.onJobClaimed?.(data);
      } catch (err) {}
    });

    eventSource.addEventListener("NEW_MESSAGE", (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data);
        callbacks?.onNewMessage?.(data);
      } catch (err) {}
    });

    eventSource.addEventListener("CONTRACT_UPDATE", (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data);
        callbacks?.onContractUpdate?.(data);
      } catch (err) {}
    });

    eventSource.addEventListener("ESCROW_UPDATE", (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data);
        callbacks?.onEscrowUpdate?.(data);
      } catch (err) {}
    });

    return () => {
      eventSource.close();
      setIsConnected(false);
    };
  }, [userId, callbacks]);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadCount(0);
  }, []);

  return {
    notifications,
    unreadCount,
    isConnected,
    markAllAsRead,
  };
}
