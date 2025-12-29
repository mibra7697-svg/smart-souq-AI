import { useState } from "react";
import { sendToAI } from "../services/ai";

const ChatBox = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { role: "bot", text: "أنا عميلك اليوم، أقنعني 👀" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((m) => [...m, userMessage]);
    setInput("");
    setLoading(true);

    const reply = await sendToAI(input);

    setMessages((m) => [...m, { role: "bot", text: reply }]);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#0b0b12] w-full max-w-md rounded-2xl p-6 text-white">
        
        <div className="flex justify-between mb-4">
          <h2 className="font-bold">💬 تحدي الإقناع</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="h-64 overflow-y-auto space-y-3 mb-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl text-sm ${
                m.role === "user"
                  ? "bg-blue-600 text-right"
                  : "bg-gray-800"
              }`}
            >
              {m.text}
            </div>
          ))}
          {loading && <div className="text-gray-500">يفكر...</div>}
        </div>

        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="اكتب إقناعك..."
            className="flex-1 rounded-xl bg-black border border-gray-700 px-4 py-2 text-sm"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 px-4 rounded-xl"
          >
            إرسال
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;