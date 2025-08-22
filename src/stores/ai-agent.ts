import { defineStore } from "pinia";
import { io, type Socket } from "socket.io-client";
import { ref } from "vue";
import { AI_AGENT_URL } from "../const";
import { useRoute } from "vue-router";

export enum Sender {
  Bot = "Bot",
  User = "User",
}

export enum MsgStatus {
  Success = "Success",
  Error = "Error",
}

export const useAiAgentStore = defineStore("socket", () => {
  const socket = ref<Socket | null>();
  const messages = ref<
    { id: number; sender: Sender; text: string; status: MsgStatus }[]
  >([]);
  const route = useRoute();
  const connect = () => {
    if (!socket.value?.connected) {
      socket.value = io(AI_AGENT_URL);
      socket.value.on("botMessage", (msg: string) => {
        messages.value.push({
          id: Date.now(),
          sender: Sender.Bot,
          text: msg,
          status: MsgStatus.Success,
        });
      });
      socket.value.on("errorMessage", () => {
        messages.value.push({
          id: Date.now(),
          sender: Sender.Bot,
          text: `Es ist ein Fehler aufgetreten`,
          status: MsgStatus.Error,
        });
      });
    }
  };

  const sendMessage = (msg: string) => {
    if (socket.value) {
      socket.value.emit("userMessage", {
        msg,
        passportUUID: route.params.permalink,
      });
      messages.value.push({
        id: Date.now(),
        sender: Sender.User,
        text: msg,
        status: MsgStatus.Success,
      });
    }
  };

  return {
    messages,
    connect,
    sendMessage,
  };
});
