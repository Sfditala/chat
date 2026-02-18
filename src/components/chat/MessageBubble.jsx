// MessageBubble.js
export default function MessageBubble({ message, currentUserId }) {
  // هل المعرف الخاص بي هو نفسه الذي أرسل هذه الرسالة؟
  const isMine = message.user === currentUserId;

  return (
    <div className={`flex w-full ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] p-3 rounded-2xl shadow-sm ${
          isMine
            ? "bg-black text-white rounded-br-none" // رسائلي: سوداء على اليمين
            : "bg-white border text-black rounded-bl-none" // رسائلهم: بيضاء على اليسار
        }`}
      >
        <p className="text-sm leading-relaxed">{message.body}</p>
        <span
          className={`text-[10px] block mt-1 opacity-50 ${isMine ? "text-right" : "text-left"}`}
        >
          {/* استخراج الوقت من Convex _creationTime */}
          {new Date(message._creationTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}
