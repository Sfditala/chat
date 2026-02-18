"use client";

import { useState } from "react";
import ChatArea from "@/components/chat/chatarea";
import ChatList from "@/components/chat/messageList";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";

export default function ChatPage() {
  const { user: clerkUser, isLoaded } = useUser(); // جلب بيانات المستخدم المسجل
  const conversations = useQuery(api.conversations.getConversations) || [];
  const [selectedConversation, setSelectedConversation] = useState(
    conversations[0] || null,
  );
  if (!isLoaded) return null;

  const currentUserId = clerkUser?.id;

  return (
    <div className="flex h-full w-full bg-background overflow-hidden">
      {/* القائمة الجانبية */}
      <div
        className={`
        ${selectedConversation ? "hidden" : "flex"} 
        md:flex w-full md:w-[320px] lg:w-[380px] flex-shrink-0 border-r flex-col
      `}
      >
        <ChatList
          onSelect={setSelectedConversation}
          selectedConversation={selectedConversation}
        />
      </div>

      {/* منطقة المحادثة */}
      <div
        className={`
        ${!selectedConversation ? "hidden" : "flex"} 
        md:flex flex-1 flex-col h-full min-w-0
      `}
      >
        {selectedConversation ? (
          <ChatArea
            selectedConversation={selectedConversation}
            userId={currentUserId}
            // نمرر دالة لإلغاء الاختيار (الرجوع)
            onBack={() => setSelectedConversation(null)}
          />
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center text-muted-foreground">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
