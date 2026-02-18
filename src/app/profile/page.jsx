"use client";

import { useUser, UserProfile } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, Mail, User, ShieldCheck, Edit3 } from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  if (!isLoaded) return <div className="p-8 text-center">Loading...</div>;

  // إذا ضغط المستخدم على تعديل، نظهر مكون Clerk الجاهز
  if (isEditing) {
    return (
      <div className="flex-1 overflow-y-auto p-6 bg-background">
        <Button
          variant="ghost"
          onClick={() => setIsEditing(false)}
          className="mb-4"
        >
          ← Back to Profile
        </Button>
        <div className="flex justify-center">
          <UserProfile routing="hash" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-background p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="gap-2 rounded-xl"
          >
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </Button>
        </div>

        {/* كارت المعلومات الشخصية */}
        <div className="bg-card rounded-2xl border p-8 flex flex-col items-center shadow-sm">
          <div className="relative group" onClick={() => setIsEditing(true)}>
            <Avatar className="w-32 h-32 border-4 border-background cursor-pointer">
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback className="text-2xl">
                {user?.fullName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Camera className="text-white w-6 h-6" />
            </div>
          </div>

          <h2 className="mt-4 text-2xl font-semibold">{user?.fullName}</h2>
          <p className="text-muted-foreground">
            {user?.primaryEmailAddress?.emailAddress}
          </p>
        </div>

        {/* باقي تفاصيل الحساب (نفس الكود السابق) */}
        <div className="grid gap-4">
          <div className="flex items-center gap-4 p-4 rounded-xl border bg-card/50">
            <User className="text-primary w-5 h-5" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground uppercase font-bold">
                Username
              </p>
              <p className="font-medium">{user?.username || "Not set"}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl border bg-card/50">
            <Mail className="text-primary w-5 h-5" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground uppercase font-bold">
                Primary Email
              </p>
              <p className="font-medium">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </div>
        </div>

        <Button
          className="w-full h-12 rounded-xl text-lg"
          onClick={() => setIsEditing(true)}
        >
          Manage Account Details
        </Button>
      </div>
    </div>
  );
}
