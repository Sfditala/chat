import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// إرسال رسالة جديدة
export const sendMessage = mutation({
  args: { conversationId: v.string(), user: v.string(), body: v.string() },
  handler: async (ctx, { conversationId, user, body }) => {
    await ctx.db.insert("messages", {
      conversationId,
      user,
      body,
      createdAt: Date.now(), // ← timestamp مهم
    });
  },
});

// جلب الرسائل حسب conversationIdeexport const getMessages = query({
export const getMessages = query({
  args: { conversationId: v.string() },
  handler: async (ctx, { conversationId }) => {
    const q = ctx.db.query("messages");
    const messages = await q
      .filter((q) => q.eq(q.field("conversationId"), conversationId))
      .collect();

    return messages;
  },
});