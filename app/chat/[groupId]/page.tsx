"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, X } from "lucide-react";

// Dummy fort names for display
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

interface ChatPageProps {
  params: {
    groupId: string;
  };
}

const ChatPage = ({ params }: ChatPageProps) => {
  const router = useRouter();
  const { groupId } = params;
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch messages from API
  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(`/api/chat/${groupId}`);
      const data = await res.json();
      setMessages(data);
    };
    fetchMessages();
    // Optionally, poll every few seconds for updates
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [groupId]);

  // Send message to API
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    await fetch(`/api/chat/${groupId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newMessage, sender: "You" }),
    });
    setNewMessage("");
    // Re-fetch messages after sending
    const res = await fetch(`/api/chat/${groupId}`);
    const data = await res.json();
    setMessages(data);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <Card>
        <CardHeader style={{ background: "#232323", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
          <CardTitle className="flex items-center justify-between">
            <span
              className="font-bold"
              style={{
                color: "#FFD6A5",
                fontSize: "1.3rem",
                letterSpacing: "0.5px",
              }}
            >
              {fortNames[groupId] || "Fort"} Planning Chat
            </span>
            <Button variant="ghost" onClick={() => router.back()}>
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent style={{ background: "#232323", borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
          <div className="space-y-3 mb-4">
            {messages.map((msg, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <MessageSquare className="h-5 w-5" style={{ color: "#FFD6A5", marginTop: 4 }} />
                <div>
                  <span className="font-semibold" style={{ color: "#FFD6A5" }}>
                    {msg.sender}:
                  </span>
                  <span style={{ color: "#FFF", marginLeft: 4 }}>{msg.text}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex mt-2">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 mr-2"
              style={{ color: "#FFF", background: "#1a1a1a", borderColor: "#FFD6A5" }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
            />
            <Button style={{ background: "#FFD6A5", color: "#232323" }} onClick={handleSendMessage}>
              Send
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatPage;