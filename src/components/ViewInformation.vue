<template>
  <div class="w-full my-10">
    <div class="flex flex-row gap-10">
      <div v-if="view?.nodes.length > 1" class="bg-white shadow-sm px-6 py-4 min-w-48 hidden md:flex">
        <Sidebar />
      </div>
      <div class="flex flex-col gap-5 w-full">
        <ProductPassportHeader />
        <ProductPassportBody />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from "./Sidebar.vue";
import ProductPassportHeader from "./ProductPassportHeader.vue";
import ProductPassportBody from "./ProductPassportBody.vue";
import {useViewStore} from "../stores/view.ts";
import {computed} from "vue";

const viewStore = useViewStore();

const view = computed(() => viewStore.view);
</script>
