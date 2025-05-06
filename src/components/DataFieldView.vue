<template>
  <div :class="[generateClassesForLayout(props.fieldView.layout)]">
    <div class="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
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
  </div>
</template>

<script setup lang="ts">
import { FieldViewDto } from "@open-dpp/api-client";
import { generateClassesForLayout } from "../lib/layout.ts";

const props = defineProps<{ fieldView: FieldViewDto }>();
</script>
