<template>
  <div :class="[generateClassesForLayout(props.fieldView.layout), 'p-4']">
    <div class="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <TextFieldView
        v-if="props.fieldView.type === DataFieldType.TEXT_FIELD"
        :field-view="props.fieldView"
      />
      <ProductPassportLinkView
        v-if="props.fieldView.type === DataFieldType.PRODUCT_PASSPORT_LINK"
        :field-view="props.fieldView"
      />
      <NumericFieldView
        v-if="props.fieldView.type === DataFieldType.NUMERIC_FIELD"
        :field-view="props.fieldView"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { DataFieldType, FieldViewDto } from "@open-dpp/api-client";
import { generateClassesForLayout } from "../lib/layout";
import TextFieldView from "./TextFieldView.vue";
import ProductPassportLinkView from "./ProductPassportLinkView.vue";
import NumericFieldView from "./NumericFieldView.vue";

const props = defineProps<{ fieldView: FieldViewDto }>();
</script>
