<template>
  <div class="flex w-full">
    <div class="w-full overflow-hidden bg-white shadow sm:rounded-lg">
      <div class="px-4 py-6 sm:px-6">
        <h3 class="text-base/7 font-semibold text-gray-900">{{ title }}</h3>
        <p class="mt-1 max-w-2xl text-sm/6 text-gray-500">{{ subtitle }}</p>
      </div>
      <div class="p-5">
        <slot/>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps<{
  title: string;
  subtitle: string;
}>();
</script>