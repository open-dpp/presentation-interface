<template>
  <button
    type="button"
    :class="[
      generateClassesForLayout(props.fieldView.layout),
      'p-3 text-sm cursor-pointer font-medium text-blue-600 hover:text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    ]"
    @click="onLinkClick"
  >
    {{ props.fieldView.name }}
  </button>
</template>
<script setup lang="ts">
import { generateClassesForLayout } from "../lib/layout";
import { FieldViewDto } from "@open-dpp/api-client";
import { useRouter } from "vue-router";
const props = defineProps<{ fieldView: FieldViewDto }>();

const router = useRouter();

const onLinkClick = () => {
  router.push(`/${props.fieldView.value}`);
};
</script>
