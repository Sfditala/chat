import { mutation } from "./_generated/server";

export const initDemoConversations = mutation(async ({ db }) => {
  const demo = [
    { title: "General", participants: ["Tala", "Bot"] },
    { title: "Project Chat", participants: ["Tala", "Ali"] },
  ];

  await Promise.all(demo.map((conv) => db.insert("conversations", conv)));
});
