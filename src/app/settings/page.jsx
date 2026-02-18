"use client";

import {
  Bell,
  Moon,
  Lock,
  Globe,
  LogOut,
  ChevronRight,
  Sun,
} from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { signOut } = useClerk();
  const router = useRouter();

  // 1. تفعيل الوضع الليلي
  const handleThemeChange = (checked) => {
    const newTheme = checked ? "dark" : "light";
    setTheme(newTheme);
    toast.success(`Theme switched to ${newTheme} mode!`);
  };

  // 2. تفعيل خروج آمن بدون أخطاء
  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="flex-1 overflow-y-auto bg-background p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Settings</h1>

        <div className="space-y-4">
          {/* Dark Mode - مفعل بالكامل */}
          <div className="flex items-center justify-between p-4 rounded-xl border bg-card transition-all">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                {theme === "dark" ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </div>
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-xs text-muted-foreground">
                  Adjust the app's appearance
                </p>
              </div>
            </div>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={handleThemeChange}
            />
          </div>

          {/* Notifications */}
          <div
            onClick={() =>
              toast.info(
                "Notification settings will be available in the next update!",
              )
            }
            className="group flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-accent/50 cursor-pointer transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium">Notifications</p>
                <p className="text-xs text-muted-foreground">
                  Manage alerts and sounds
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-all" />
          </div>

          {/* Privacy & Security */}
          <div
            onClick={() => router.push("/profile")} // الربط مع صفحة البروفايل التي فعلنا فيها UserProfile
            className="group flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-accent/50 cursor-pointer transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium">Privacy & Security</p>
                <p className="text-xs text-muted-foreground">
                  Two-factor authentication
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-all" />
          </div>

          {/* Language */}
          <div
            onClick={() => toast.info("Language is set to English by default.")}
            className="group flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-accent/50 cursor-pointer transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium">Language</p>
                <p className="text-xs text-muted-foreground">Arabic, English</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-all" />
          </div>
        </div>

        {/* زر تسجيل الخروج المعدل */}
        <div className="pt-6 border-t">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-all font-bold"
          >
            <LogOut className="w-5 h-5" />
            Sign Out from Account
          </button>
        </div>
      </div>
    </div>
  );
}
