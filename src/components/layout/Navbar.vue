<template>
  <Disclosure as="header" class="bg-white shadow-sm">
    <div
      class="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8"
    >
      <div class="relative flex h-32 justify-between items-center">
        <div class="flex px-2 lg:px-0">
          <div class="flex shrink-0 items-center">
            <img
              class="h-12 w-auto"
              src="../../assets/logo-with-text.svg"
              alt="open-dpp GmbH"
            />
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button
            v-if="!aiChatOpened"
            type="button"
            @click="navigateToAiChat"
            class="rounded-md bg-indigo-600 p-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <ChatBubbleOvalLeftEllipsisIcon class="size-5 mr-2 inline-block" />
            Mit KI chatten
          </button>
          <button
            v-if="aiChatOpened"
            type="button"
            @click="navigateToPassportView"
            class="rounded-md bg-indigo-600 p-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Zur Passansicht
          </button>
          <button
            type="button"
            class="hidden md:flex rounded-md bg-[#A2C7AB] p-3 text-black hover:cursor-pointer text-sm"
            @click="backToApp"
          >
            <span>Zurück zur App</span>
          </button>
        </div>
      </div>
    </div>
  </Disclosure>
</template>

<script lang="ts" setup>
import { Disclosure } from "@headlessui/vue";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/vue/16/solid";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
const route = useRoute();
const router = useRouter();
const aiChatOpened = ref<boolean>(false);

const navigateToPassportView = () => {
  router.push(`/${route.params.permalink}`);
  aiChatOpened.value = false;
};

const navigateToAiChat = () => {
  router.push(`/${route.params.permalink}/chat`);
  aiChatOpened.value = true;
};

const backToApp = () => {
  window.location.href = "https://admin.cloud.open-dpp.de";
};
</script>
