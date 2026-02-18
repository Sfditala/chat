"use client";

import { useState } from "react";
import { Search, UserPlus, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import ContactItem from "@/components/contact/contactItem";
// استيراد أدوات Convex
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";

export default function ContactsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  // 1. جلب المستخدمين الحقيقيين من قاعدة البيانات
  const users = useQuery(api.users.getUsers);

  // 2. استدعاء Mutation إنشاء المحادثة
  const createChat = useMutation(api.conversations.createOrGetConversation);

  // دالة التعامل مع الضغط على المستخدم
  const handleContactClick = async (contact) => {
    try {
      // إنشاء محادثة أو جلب القديمة
      const conversationId = await createChat({
        participantId: contact.clerkId,
        participantName: contact.name,
      });

      // الانتقال لصفحة الشات مع الـ ID الخاص بالمحادثة
      // تأكدي أن مسار صفحة الشات عندك هو /chat/[id] أو عدليه ليتناسب مع هيكلية ملفاتك
      router.push(`/chat?id=${conversationId}`);
    } catch (error) {
      console.error("Error starting chat:", error);
    }
  };

  // تصفية المستخدمين بناءً على بحث المستخدم
  const filteredUsers = users?.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex flex-col h-full w-full bg-background overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b bg-card/50">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Contacts</h1>
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">
            <UserPlus className="w-4 h-4" />
            Add New
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            className="pl-10 h-11 bg-muted/50 border-none rounded-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* قائمة جهات الاتصال */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        {!users ? (
          // حالة التحميل
          <div className="flex justify-center items-center h-40">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredUsers.map((user) => (
              <ContactItem
                key={user._id}
                name={user.name}
                email={user.email}
                image={user.image}
                // عند الضغط، نبدأ المحادثة
                onClick={() => handleContactClick(user)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground pt-10">
            <p>No contacts found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
