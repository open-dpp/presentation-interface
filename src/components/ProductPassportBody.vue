<script setup lang="ts">
import { useProductPassportStore } from "../stores/view";
import { computed } from "vue";
import { SectionType } from "@open-dpp/api-client";
import TableView from "./TableView.vue";
import SectionView from "./SectionView.vue";
import { useRoute } from "vue-router";

const route = useRoute();

// Access query parameters
const parentSectionId = route.query.parentSectionId;
const rowIndex = route.query.rowIndex ? Number(route.query.rowIndex) : 0;

const productPassportStore = useProductPassportStore();

const productPassport = computed(() => productPassportStore.productPassport);
</script>

<template>
  <div
    v-if="productPassport"
    v-for="(dataSection, index) in productPassport.dataSections.filter(
      (d) => d.parentId === parentSectionId,
    )"
    :key="index"
    class="overflow-hidden bg-white shadow sm:rounded-lg w-full"
  >
    <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg p-4">
      <div class="px-4 sm:px-0">
        <h3 class="text-base/7 font-semibold text-gray-900">
          {{ dataSection.name }}
        </h3>
      </div>
      <TableView
        v-if="dataSection.type === SectionType.REPEATABLE"
        :data-section="dataSection"
      />
      <SectionView
        v-if="dataSection.type === SectionType.GROUP"
        :dataSection="dataSection"
        :row-index="rowIndex"
      />
    </div>
  </div>
</template>
