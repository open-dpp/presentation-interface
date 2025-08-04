<template>
  <div class="mt-6">
    <dl class="grid grid-cols-1 sm:grid-cols-2">
      <DataFieldView
        v-for="dataField in props.dataSection.dataFields"
        :field-view="{
          dataField: dataField,
          value: props.dataSection.dataValues[rowIndex][dataField.id],
        }"
        :key="dataField.id"
      />
    </dl>
  </div>
</template>

<script setup lang="ts">
import { DataSectionDto } from "@open-dpp/api-client";
import DataFieldView from "./DataFieldView.vue";

const props = defineProps<{ dataSection: DataSectionDto; rowIndex: number }>();
</script>
