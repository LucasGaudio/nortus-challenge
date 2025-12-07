import { api } from "../api";
import { ChatData } from "@/types";

export const chatService = {
  async getChatData(): Promise<ChatData> {
    const { data } = await api.get<ChatData>("/nortus-v1/chat");
    return data;
  },
};

