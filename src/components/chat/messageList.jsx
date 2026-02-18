import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import ChatItem from "./convItem";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

export default function ChatList({ onSelect, selectedConversation }) {
  const conversations = useQuery(api.conversations.getConversations) || [];

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <div className="p-4 border-b bg-background">
        <h2 className="text-lg font-semibold">Chats</h2>

        <div className="relative mt-3">
          <Input
            placeholder="Search..."
            className="pl-10 rounded-xl bg-muted"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {conversations.map((conv) => (
          <ChatItem
            key={conv._id}
            user={conv.title}
            message={`${conv.participants.length} participants`}
            onClick={() => onSelect(conv)}
            active={selectedConversation?._id === conv._id}
          />
        ))}
      </div>
    </div>
  );
}
