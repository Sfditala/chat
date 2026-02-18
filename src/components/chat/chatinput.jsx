"use client";
import { useState } from "react";
export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;
    onSend(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="
          flex-1
          rounded-full
          border
          px-4
          py-2
          bg-muted
          focus:outline-none
        "
      />

      <button
        type="submit"
        className="
          px-4 py-2
          rounded-full
          bg-primary
          text-white
          hover:opacity-90
          transition
        "
      >
        Send
      </button>
    </form>
  );
}
