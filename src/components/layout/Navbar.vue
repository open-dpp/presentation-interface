<template>
  <header class="bg-white shadow-sm">
    <div
      class="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8"
    >
      <div class="relative flex h-16 justify-between">
        <div class="relative z-10 flex px-2 lg:px-0">
          <div class="flex shrink-0 items-center">
            <img
              :src="logo"
              alt="Your Company"
              class="h-8 w-auto hover:cursor-pointer"
              @click="goToApp"
            />
          </div>
        </div>
      </div>
      <nav aria-label="Global" class="hidden lg:flex lg:space-x-8 lg:py-2">
        <button
          v-for="item in navigation"
          :key="item.name"
          :aria-current="item.current ? 'page' : undefined"
          :class="[
            item.current
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900',
            'inline-flex items-center rounded-md px-3 py-2 text-sm font-medium',
          ]"
          @click="item.select"
        >
          {{ item.name }}
        </button>
      </nav>
    </div>
  </header>
</template>

<script lang="ts" setup>
import logo from "../../assets/logo-with-text.svg";
import { useIndexStore } from "../../stores";
import { computed } from "vue";
import { MANAGEMENT_ROOT_URL } from "../../const";

const indexStore = useIndexStore();

const navigation = computed(() => [
  {
    name: "Kontrollbehörde",
    select: () => (indexStore.view = "compliance"),
    current: indexStore.view === "compliance",
  },
  {
    name: "Endkunde",
    select: () => (indexStore.view = "client"),
    current: indexStore.view === "client",
  },
]);

const goToApp = () => {
  window.location.href = MANAGEMENT_ROOT_URL;
};
</script>
