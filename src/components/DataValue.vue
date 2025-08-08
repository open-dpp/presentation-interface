<template>
  <LinkValue
    v-if="
      props.fieldView.dataField.type === DataFieldType.PRODUCT_PASSPORT_LINK
    "
    :field-view="props.fieldView"
  />
  <span v-else>{{ props.fieldView.value }}</span>
</template>

<script setup lang="ts">
import { FieldView } from "../lib/field-view";
import { DataFieldType } from "@open-dpp/api-client";
import LinkValue from "./LinkValue.vue";

const props = defineProps<{ fieldView: FieldView }>();
</script>
