import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * دالة لتخزين أو تحديث بيانات المستخدم عند تسجيل الدخول
 * يتم استدعاؤها عادة من مكون Providers أو Layout عند تحميل التطبيق
 */
export const storeUser = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("لم يتم التحقق من الهوية - سجل دخولك أولاً");
    }

    // البحث عن المستخدم في قاعدة البيانات بناءً على معرف Clerk الفريد
    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (user !== null) {
      // إذا كان المستخدم موجوداً مسبقاً، نقوم بتحديث بياناته (الاسم والصورة مثلاً)
      await ctx.db.patch(user._id, {
        name: identity.name!,
        image: identity.pictureUrl!,
      });
      return user._id;
    }

    // إذا كان مستخدماً جديداً، نقوم بإنشاء سجل له
    return await ctx.db.insert("users", {
      name: identity.name!,
      email: identity.email!,
      image: identity.pictureUrl!,
      clerkId: identity.subject, // هذا هو المعرف الذي نستخدمه في participants
      tokenIdentifier: identity.tokenIdentifier,
    });
  },
});

/**
 * دالة لجلب قائمة جهات الاتصال (كل المستخدمين ما عدا المستخدم الحالي)
 * تُستخدم في صفحة الـ Contacts
 */
export const getUsers = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    // جلب كل المستخدمين
    const allUsers = await ctx.db.query("users").collect();

    // تصفية القائمة لاستثناء المستخدم الحالي (أنت)
    // لكي لا تظهر نفسك في قائمة جهات الاتصال
    return allUsers.filter(
      (user) => user.tokenIdentifier !== identity.tokenIdentifier
    );
  },
});