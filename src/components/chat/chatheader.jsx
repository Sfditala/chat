import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, Video, MoreVertical } from "lucide-react";
import { ArrowLeft } from "lucide-react";

export default function ChatHeader({ name, avatar, onBack }) {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      {/* Back Button for mobile */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Back Button for mobile */}
        <button
          onClick={onBack}
          className="md:hidden p-1 -ml-1 hover:bg-muted rounded-full transition"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <Avatar className="w-10 h-10">
          <AvatarImage src={avatar} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <h2 className="text-lg font-semibold">{name}</h2>
      </div>
      <div className="flex items-center gap-4">
        <Phone className="w-5 h-5 cursor-pointer text-muted-foreground hover:text-primary transition" />
        <Video className="w-5 h-5 cursor-pointer text-muted-foreground hover:text-primary transition" />
        <MoreVertical className="w-5 h-5 cursor-pointer text-muted-foreground hover:text-primary transition" />
      </div>
    </div>
  );
}
