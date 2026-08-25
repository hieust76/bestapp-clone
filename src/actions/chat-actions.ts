"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { eventBus } from "@/lib/events";

/**
 * Server Action: Lấy danh sách cuộc trò chuyện của User
 */
export async function getConversationsAction(userId: string) {
  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        OR: [
          { project: { customerId: userId } },
          { project: { assignedPrinter: { userId } } },
        ],
      },
      include: {
        project: {
          include: {
            customer: true,
            assignedPrinter: {
              include: { user: true },
            },
            contract: true,
          },
        },
        messages: {
          take: 1,
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    return { success: true, conversations };
  } catch (error: any) {
    return { success: false, error: error.message, conversations: [] };
  }
}

/**
 * Server Action: Lấy tin nhắn trong một cuộc trò chuyện
 */
export async function getMessagesAction(conversationId: string, userId: string) {
  try {
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        project: {
          include: {
            customer: true,
            assignedPrinter: {
              include: { user: true },
            },
            contract: {
              include: { escrow: true },
            },
          },
        },
        messages: {
          include: { sender: true },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!conversation) {
      return { success: false, error: "Cuộc trò chuyện không tồn tại" };
    }

    return { success: true, conversation };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Server Action: Gửi tin nhắn mới trong phòng chat & Bắn SSE Event
 */
export async function sendMessageAction(
  conversationId: string,
  senderId: string,
  content: string,
  attachmentUrl?: string
) {
  try {
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        project: {
          include: {
            customer: true,
            assignedPrinter: { include: { user: true } },
          },
        },
      },
    });

    if (!conversation) {
      return { success: false, error: "Cuộc trò chuyện không tồn tại" };
    }

    // Tạo tin nhắn mới
    const message = await prisma.message.create({
      data: {
        conversationId,
        senderId,
        content,
        attachmentUrl,
      },
      include: {
        sender: {
          select: { id: true, name: true, avatar: true, role: true },
        },
      },
    });

    // Cập nhật updatedAt của Conversation
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });

    // Xác định người nhận
    const recipientUserId =
      senderId === conversation.project.customerId
        ? conversation.project.assignedPrinter?.userId
        : conversation.project.customerId;

    // Phát sự kiện real-time qua SSE Event Bus
    eventBus.broadcast({
      type: "NEW_MESSAGE",
      recipientUserId,
      data: {
        conversationId,
        message,
      },
    });

    revalidatePath(`/chat/${conversationId}`);
    return { success: true, message };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
