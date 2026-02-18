import { mutation } from "./_generated/server";

export const initDemoMessages = mutation(async ({ db }) => {
  const demo = [
    {
      conversationId: "General",
      user: "Tala",
      body: "هلا! 👋",
      createdAt: Date.now(),
    },
    {
      conversationId: "General",
      user: "Bot",
      body: "هلا تالا! كيفك اليوم؟",
      createdAt: Date.now(),
    },
    {
      conversationId: "Project Chat",
      user: "Ali",
      body: "خلصنا الجزء الأول من المشروع",
      createdAt: Date.now(),
    },
  ];

  await Promise.all(demo.map((msg) => db.insert("messages", msg)));
});
