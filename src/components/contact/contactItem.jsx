import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ContactItem({ name, image, email, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 cursor-pointer transition border border-transparent hover:border-border"
    >
      <Avatar className="w-12 h-12">
        <AvatarImage src={image} />
        <AvatarFallback>{name?.[0] || "U"}</AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm md:text-base truncate">{name}</h3>
        <p className="text-xs text-muted-foreground truncate">{email}</p>
      </div>

      <div className="w-2 h-2 rounded-full bg-green-500" title="Online" />
    </div>
  );
}
