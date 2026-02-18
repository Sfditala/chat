import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * 1. جلب جميع المحادثات التي يشارك فيها المستخدم الحالي
 */
export const getConversations = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const userId = identity.subject;

    const allConversations = await ctx.db.query("conversations").collect();

    return allConversations.filter((conv) =>
      conv.participants.includes(userId)
    );
  },
});

/**
 * 2. إنشاء محادثة جديدة أو جلب المحادثة الموجودة مسبقاً
 */
export const createOrGetConversation = mutation({
  args: { 
    participantId: v.string(), 
    participantName: v.string() 
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("غير مصرح لك - سجل دخولك أولاً");

    const userId = identity.subject;

    if (userId === args.participantId) {
      throw new Error("لا يمكنك بدء محادثة مع نفسك");
    }

    const allConversations = await ctx.db.query("conversations").collect();
    
    const existingConversation = allConversations.find((conv) => 
      conv.participants.length === 2 && 
      conv.participants.includes(userId) && 
      conv.participants.includes(args.participantId)
    );

    if (existingConversation) {
      return existingConversation._id;
    }

    const newConversationId = await ctx.db.insert("conversations", {
      title: args.participantName, 
      participants: [userId, args.participantId],
    });

    return newConversationId;
  },
});

/**
 * 3. جلب محادثة واحدة محددة مع بيانات الطرف الآخر (معدلة)
 */
export const getConversationById = query({
  args: { conversationId: v.id("conversations") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const conversation = await ctx.db.get(args.conversationId);
    
    if (!conversation || !conversation.participants.includes(identity.subject)) {
      return null;
    }

    // البحث عن المعرف الخاص بالطرف الآخر في المصفوفة
    const otherUserId = conversation.participants.find(id => id !== identity.subject);

    // جلب بيانات الطرف الآخر من جدول المستخدمين
    const otherUser = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", otherUserId!))
      .unique();

    return {
      ...conversation,
      otherUser: otherUser ? {
        name: otherUser.name,
        image: otherUser.image,
      } : null,
    };
  },
});