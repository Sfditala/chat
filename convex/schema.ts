import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.string(),
    clerkId: v.string(),
    tokenIdentifier: v.string(),
    // online: v.boolean(), // فكي التعليق عن هذا السطر إذا كنتِ ستستخدمينه
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),

  conversations: defineTable({
    title: v.string(),
    participants: v.array(v.string()),
  }),

  messages: defineTable({
    conversationId: v.string(),
    user: v.string(),
    body: v.string(),
    createdAt: v.optional(v.float64()),
  }),
});