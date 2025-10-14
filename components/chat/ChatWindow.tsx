import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Message = {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
};

type ChatWindowProps = {
  groupId: number;
};

export default function ChatWindow({ groupId }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Fetch messages for the specific group (mocked for now)
    const fetchMessages = async () => {
      // Replace with actual API call
      const fetchedMessages: Message[] = [
        { id: 1, text: "Hello everyone!", sender: "User1", timestamp: "10:00 AM" },
        { id: 2, text: "Welcome to the group!", sender: "User2", timestamp: "10:05 AM" },
      ];
      setMessages(fetchedMessages);
    };

    fetchMessages();
  }, [groupId]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const message: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "You",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-full">
      <Card className="flex-1 overflow-y-auto">
        <CardHeader>
          <CardTitle>Chat Group {groupId}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-2">
          {messages.map((message) => (
            <div key={message.id} className="flex items-start">
              <span className="font-semibold">{message.sender}: </span>
              <span className="ml-2">{message.text}</span>
              <span className="text-xs text-gray-500 ml-2">{message.timestamp}</span>
            </div>
          ))}
        </CardContent>
      </Card>
      <div className="flex items-center mt-4">
        <Input
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleSendMessage} className="ml-2">
          Send
        </Button>
      </div>
    </div>
  );
}