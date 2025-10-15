"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

const fortNames: Record<string, string> = {
  "1": "Lohgad Fort",
  "2": "Visapur Fort",
  "3": "Korigad Fort",
  "4": "Tikona Fort",
  "5": "Kalavantin Durg",
  "6": "Prabalgad Fort",
  "7": "Sindhudurg Fort",
  "8": "Vijaydurg Fort",
};

const getRandomDate = () => {
  const start = new Date(2025, 9, 15);
  const end = new Date(2025, 11, 31);
  const randomTime =
    start.getTime() + Math.random() * (end.getTime() - start.getTime());
  const date = new Date(randomTime);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const defaultMessages = [
  { sender: "Aarav", text: "Hey everyone! When are we planning to go?" },
  { sender: "Riya", text: "Let's go next weekend!" },
  { sender: "Karan", text: "I’m in! How’s Saturday morning?" },
  { sender: "Sneha", text: "Sounds perfect. We can leave early!" },
  { sender: "Aarav", text: "Don’t forget to bring enough water bottles!" },
  { sender: "Riya", text: "Yes! And maybe some snacks 😋" },
  { sender: "Karan", text: "Should we book a cab or take bikes?" },
  { sender: "Sneha", text: "Cab will be better, shared cost." },
  { sender: "Aarav", text: "Agree. Let’s split cost among us." },
  { sender: "Riya", text: "I’ll check the route map tonight." },
  { sender: "Sneha", text: "Also, don’t forget to carry raincoats." },
  { sender: "Karan", text: "True. Weather’s been unpredictable lately." },
  { sender: "Aarav", text: "We should also plan lunch at the base village." },
  { sender: "Riya", text: "I know a small dhaba near the parking area." },
  { sender: "Sneha", text: "Perfect! This is going to be fun 😍" },
  { sender: "Karan", text: "Can’t wait for this trip!" },
  { sender: "Aarav", text: "Same here! Let’s finalize soon!" },
  { sender: "Riya", text: "Yay! Adventure time 🏞️" },
];

interface ChatPageProps {
  params: {
    groupId: string;
  };
}

const ChatPage = ({ params }: ChatPageProps) => {
  const router = useRouter();
  const { groupId } = params;

  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [plannedDate] = useState(getRandomDate());
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Load messages after component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`chat-${groupId}`);
      if (saved) {
        setMessages(JSON.parse(saved));
      } else {
        setMessages(defaultMessages);
        localStorage.setItem(`chat-${groupId}`, JSON.stringify(defaultMessages));
      }
    }
  }, [groupId]);

  // Save messages to localStorage on change
  useEffect(() => {
    if (typeof window !== "undefined" && messages.length > 0) {
      localStorage.setItem(`chat-${groupId}`, JSON.stringify(messages));
    }
  }, [messages, groupId]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const newMsg = { sender: "You", text: newMessage };
    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-screen w-screen flex flex-col bg-[#232323] text-white">
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#FFD6A5] bg-[#1a1a1a] sticky top-0 z-10">
        <div>
          <span className="font-bold text-lg text-[#FFD6A5]">
            {fortNames[groupId] || "Fort"} Planning Chat
          </span>
          <span className="ml-2 text-sm text-gray-300">
            | Planned at: <span className="text-[#FFD6A5]">{plannedDate}</span>
          </span>
        </div>
        <Button variant="ghost" onClick={() => router.back()}>
          <X className="h-5 w-5 text-[#FFD6A5]" />
        </Button>
      </div>

      {/* CHAT BODY */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg, idx) => {
          const isUser = msg.sender === "You";
          return (
            <div
              key={idx}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded-2xl px-4 py-2 max-w-[75%] shadow-md ${
                  isUser ? "bg-[#FFD6A5] text-black" : "bg-[#1a1a1a] text-white"
                }`}
                style={{
                  border: isUser ? "none" : "1px solid #FFD6A5",
                }}
              >
                {!isUser && (
                  <div className="text-sm font-semibold mb-1 text-[#FFD6A5]">
                    {msg.sender}
                  </div>
                )}
                <div>{msg.text}</div>
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      {/* FOOTER INPUT */}
      <div className="flex p-3 items-center gap-2 border-t border-[#FFD6A5] bg-[#1a1a1a] sticky bottom-0">
        <Input
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1"
          style={{
            color: "#FFF",
            background: "#1a1a1a",
            borderColor: "#FFD6A5",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
        />
        <Button
          style={{
            background: "#FFD6A5",
            color: "#232323",
            fontWeight: "bold",
          }}
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatPage;
