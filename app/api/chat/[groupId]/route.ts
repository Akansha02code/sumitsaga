import { NextResponse } from "next/server";

let messagesStore: Record<string, { text: string; sender: string }[]> = {};

export async function GET(request: Request, { params }: { params: { groupId: string } }) {
  const { groupId } = params;
  if (!messagesStore[groupId]) {
    messagesStore[groupId] = [
      { text: "Hey everyone! Let's plan the trek for next weekend.", sender: "Amit" },
      { text: "Sounds good! What time should we meet?", sender: "Priya" },
      { text: "Can we start early to avoid the heat?", sender: "Rahul" },
      { text: "I can bring snacks and water.", sender: "Sneha" },
    ];
  }
  return NextResponse.json(messagesStore[groupId]);
}

export async function POST(request: Request, { params }: { params: { groupId: string } }) {
  const { groupId } = params;
  const { text, sender } = await request.json();
  if (!messagesStore[groupId]) messagesStore[groupId] = [];
  messagesStore[groupId].push({ text, sender });
  return NextResponse.json({ success: true });
}