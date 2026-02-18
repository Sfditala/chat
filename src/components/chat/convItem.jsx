import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "../ui/badge";

export default function ChatItem({
  user,
  message,
  time,
  avatar,
  unread,
  active,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition
      ${active ? "bg-muted" : "hover:bg-muted/50"}`}
    >
      {/* Avatar */}
      <Avatar className="w-11 h-11">
        <AvatarImage src={avatar} />
        <AvatarFallback>{user.charAt(0)}</AvatarFallback>
      </Avatar>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold truncate">{user}</h4>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>

        <p className="text-sm text-muted-foreground truncate">{message}</p>
      </div>

      {/* Unread */}
      {unread > 0 && (
        <Badge className="rounded-full px-2 text-xs">{unread}</Badge>
      )}
    </div>
  );
}
