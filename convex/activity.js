/*import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const setTyping = mutation({
  args: { isTyping: v.boolean() },
  handler: async (ctx, { isTyping }) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("Not authenticated");

    await ctx.db.insert("activity", {
      userId: user.subject,
      isTyping,
      lastSeen: Date.now(),
    });
  },
});

export const getTypingUsers = query({
  args: { conversationId: v.string() },
  handler: async (ctx, { conversationId }) => {
    const messages = await ctx.db
      .query("messages")
      .filter((m) => m.conversationId === conversationId)
      .collect();

    const userIds = new Set(messages.map((m) => m.senderId));
    return await ctx.db
      .query("activity")
      .filter((a) => userIds.has(a.userId) && a.isTyping)
      .collect();
  },
});*/
