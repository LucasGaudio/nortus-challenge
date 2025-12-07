"use client";

import { useChat } from "@/hooks/useChat";
import { UserMessage } from "@/components/chat/UserMessage";
import { AssistantMessage } from "@/components/chat/AssistantMessage";
import { IASuggestion } from "@/components/chat/IASuggestion";
import { ChatInput } from "@/components/chat/ChatInput";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function ChatPage() {
  const { data, loading } = useChat();

  if (loading || !data) {
    return (
      <div className="flex min-h-screen bg-[#0F172A] text-white">
        <Sidebar />
        <main className="flex-1 flex flex-col p-8 gap-8">
          <Topbar title="Chat & Assistente Virtual" />
          <div className="text-white p-10">
            Carregando conversa...
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0F172A] text-white">
      <Sidebar />

      <main className="flex-1 flex flex-col p-8 gap-8">
        <Topbar title="Chat & Assistente Virtual" />

        <div className="w-full h-full pr-12">
          <div className="
            bg-[#111827] border border-[#1f2a37] rounded-2xl 
            p-10 h-[75vh] flex flex-col justify-between shadow-xl
          ">
            
            {/* Área de mensagens */}
            <div className="overflow-y-auto pr-3 flex-1">

              {data.messages.map((msg) => {
                if (msg.type === "user_message") {
                  return (
                    <UserMessage
                      key={msg.id}
                      author={msg.author}
                      content={msg.content}
                      timestamp={msg.timestamp}
                    />
                  );
                }

                if (msg.type === "assistant_message") {
                  return (
                    <AssistantMessage
                      key={msg.id}
                      content={msg.content}
                      timestamp={msg.timestamp}
                    />
                  );
                }

                if (msg.type === "ai_suggestion") {
                  return (
                    <IASuggestion
                      key={msg.id}
                      content={msg.content}
                      timestamp={msg.timestamp}
                    />
                  );
                }

                return null;
              })}

            </div>

            {/* Input */}
            <ChatInput />

          </div>
        </div>
      </main>
    </div>
  );
}
