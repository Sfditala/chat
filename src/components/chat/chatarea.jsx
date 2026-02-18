import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import MessageBubble from "./MessageBubble";
import MessageInput from "./chatinput";
import ChatHeader from "./chatheader";

export default function ChatArea({ selectedConversation, userId, onBack }) {
  const messages =
    useQuery(api.messages.getMessages, {
      conversationId: selectedConversation?._id || "General",
    }) || []; // <-- هالجزء مهم

  if (!selectedConversation) return null;

  const sendMessage = useMutation(api.messages.sendMessage);

  const handleSend = async (text) => {
    await sendMessage({
      conversationId: selectedConversation._id,
      user: userId, // هنا نرسل الـ ID (مثلاً: user_2N...)
      body: text,
    });
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <ChatHeader
        name={selectedConversation.title}
        avatar={selectedConversation.avatar}
        onBack={onBack} // مررها هنا
      />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/20">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground mt-10">
            No messages yet 👋
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble key={msg._id} message={msg} currentUserId={userId} />
          ))
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-background">
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}
