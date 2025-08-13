<<!-- src/components/Chat.vue -->
<template>
  <div>
    <div v-for="m in messages" :key="m.id">
      <strong>{{ m.sender }}:</strong> {{ m.text }}
    </div>
    <input
      v-model="input"
      @keyup.enter="sendMessage"
      placeholder="Type a message..."
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { io } from "socket.io-client";

const socket = io("http://localhost:5001");
const messages = ref([]);
const input = ref("");

onMounted(() => {
  socket.on("botMessage", (msg) => {
    messages.value.push({ id: Date.now(), sender: "Bot", text: msg });
  });
});

function sendMessage() {
  socket.emit("userMessage", input.value);
  messages.value.push({ id: Date.now(), sender: "You", text: input.value });
  input.value = "";
}
</script>
