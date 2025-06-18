<template>
  <div>
    <dt class="mb-1 text-sm font-medium text-gray-500">
      {{ props.fieldView.name }}
    </dt>
    <dd
      :class="[
        'text-sm font-medium text-gray-900',
        generateClassesForLayout(props.fieldView.layout),
      ]"
    >
      {{ props.fieldView.value }}
    </dd>
  </div>
</template>
<script setup lang="ts">
import { generateClassesForLayout } from "../lib/layout.ts";
import { FieldViewDto } from "@open-dpp/api-client";
const props = defineProps<{ fieldView: FieldViewDto }>();
</script>
