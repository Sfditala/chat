"use client";

import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, Settings } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const { user } = useUser();
  if (!user) return null;

  return (
    // التعديل هنا: استخدمنا bg-background و border-r لضمان التوافق مع الثيم
    <div className="w-14 sm:w-20 h-dvh flex flex-col items-center py-6 gap-6 border-r bg-background transition-colors duration-300">
      {/* Profile */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href="/profile">
            <Avatar className="w-10 h-10 cursor-pointer ring-2 ring-transparent hover:ring-primary transition">
              {/* تأكدي من استخدام user.imageUrl لجلب الصورة الحقيقية من Clerk */}
              <AvatarImage src={user.imageUrl} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {user.firstName?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{user.firstName || "User"}</TooltipContent>
      </Tooltip>

      <div className="flex flex-col gap-4 w-full items-center">
        {/* Chats */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/chat" className="flex flex-col items-center group">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-xl group-hover:bg-accent transition p-2"
              >
                <MessageSquare className="w-5 h-5" />
              </Button>
              <span className="text-[10px] font-medium mt-1 opacity-70 group-hover:opacity-100">
                Chat
              </span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Chats</TooltipContent>
        </Tooltip>

        {/* Contacts */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/user" className="flex flex-col items-center group">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-xl group-hover:bg-accent transition p-2"
              >
                <Users className="w-5 h-5" />
              </Button>
              <span className="text-[10px] font-medium mt-1 opacity-70 group-hover:opacity-100">
                Contacts
              </span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Contacts</TooltipContent>
        </Tooltip>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Settings */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href="/settings" className="mb-4">
            <Button
              size="icon"
              variant="ghost"
              className="rounded-xl hover:bg-accent transition"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">Settings</TooltipContent>
      </Tooltip>
    </div>
  );
}
