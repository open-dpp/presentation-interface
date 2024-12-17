<template>
  <div class="">
    <div class="sm:flex sm:items-baseline sm:justify-between">
      <div class="sm:w-0 sm:flex-1">
        <h1 id="message-heading" class="text-base font-semibold text-gray-900">{{ product?.name }}</h1>
        <p class="mt-1 truncate text-sm text-gray-500">{{ product?.description }}</p>
      </div>

      <div class="mt-4 flex items-center justify-between sm:ml-6 sm:mt-0 sm:flex-shrink-0 sm:justify-start">
        <span
            class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Verified</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {useProductStore} from "../stores/product.ts";
import {computed} from "vue";

const productStore = useProductStore();

const product = computed(() => productStore.product);
</script>