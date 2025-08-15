import { defineStore } from "pinia";
import { io, type Socket } from "socket.io-client";
import { ref } from "vue";
import { AI_AGENT_URL } from "../const";

export enum Sender {
  Bot = "Bot",
  User = "User",
}

export const useAiAgentStore = defineStore("socket", () => {
  const socket = ref<Socket | null>();
  const messages = ref<{ id: number; sender: Sender; text: string }[]>([]);

  const connect = () => {
    socket.value = io(AI_AGENT_URL);
    socket.value.on("botMessage", (msg: string) => {
      messages.value.push({ id: Date.now(), sender: Sender.Bot, text: msg });
    });
  };

  const sendMessage = (msg: string) => {
    if (socket.value) {
      socket.value.emit("userMessage", msg);
      messages.value.push({
        id: Date.now(),
        sender: Sender.User,
        text: msg,
      });
    }
  };

  return {
    messages,
    connect,
    sendMessage,
  };
});
