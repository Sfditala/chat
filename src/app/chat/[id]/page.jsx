"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import ChatHeader from "@/components/chat/ChatHeader";
import MessageBubble from "@/components/chat/MessageBubble";
import ChatInput from "@/components/chat/ChatInput";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const { user: clerkUser, isLoaded: isUserLoaded } = useUser();

  // جلب المعرف من الرابط
  const conversationId = params.id;

  // 1. جلب بيانات المحادثة (التي أصبحت تحتوي الآن على otherUser من الـ Backend)
  const conversation = useQuery(api.conversations.getConversationById, {
    conversationId: conversationId,
  });

  // 2. جلب الرسائل
  const messages = useQuery(api.messages.getMessages, {
    conversationId: conversationId,
  });

  // حالة التحميل الأولية (بينما يتم التحقق من المستخدم والبيانات)
  if (!isUserLoaded || conversation === undefined) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading chat...</p>
        </div>
      </div>
    );
  }

  // إذا كانت المحادثة غير موجودة أو المستخدم ليس طرفاً فيها
  if (conversation === null) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-background">
        <div className="text-center">
          <h3 className="text-lg font-semibold">Conversation not found</h3>
          <p className="text-muted-foreground">
            It seems this chat doesn't exist.
          </p>
          <button
            onClick={() => router.push("/contacts")}
            className="mt-4 text-primary underline"
          >
            Back to Contacts
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden">
      {/* تعديل الهيدر: 
          نمرر name و avatar من بيانات otherUser التي جلبناها في الـ Backend
      */}
      <ChatHeader
        // التغيير هنا: نستخدم otherUser أولاً، وإذا لم يتوفر نستخدم title
        name={conversation.otherUser?.name || conversation.title}
        avatar={conversation.otherUser?.image}
        onBack={() => router.push("/contacts")}
      />

      {/* منطقة عرض الرسائل */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {messages?.map((msg) => (
          <MessageBubble
            key={msg._id}
            message={msg}
            currentUserId={clerkUser?.id}
          />
        ))}

        {/* إذا كانت المحادثة فارغة */}
        {messages !== undefined && messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full opacity-50">
            <p className="text-sm">No messages yet</p>
            <p className="text-xs">
              Say hello to {conversation.otherUser?.name}!
            </p>
          </div>
        )}
      </div>

      {/* منطقة إدخال النص */}
      <div className="p-4 bg-background border-t">
        <ChatInput conversationId={conversationId} userId={clerkUser?.id} />
      </div>
    </div>
  );
}
