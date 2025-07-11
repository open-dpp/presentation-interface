<template>
  <div class="grid col-span-1 grid-cols-1">
    <div
      :class="[
        'grid items-center gap-2',
        generateClassesForLayout(props.rowView.layout),
      ]"
    >
      <DataFieldView
        v-for="(fieldView, index) in fieldViews"
        :field-view="fieldView"
        :key="index"
      />
      <SectionView
        v-for="(subSectionView, index) in subSectionViews"
        :key="index"
        :section-view="subSectionView"
      />
    </div>
  </div>
  <div v-if="!props.isLastRow" class="flex items-center m-2" aria-hidden="true">
    <div class="w-full border-t border-gray-300" />
  </div>
</template>

<script setup lang="ts">
import DataFieldView from "./DataFieldView.vue";
import SectionView from "./SectionView.vue";
import {
  FieldViewDto,
  isDataFieldView,
  isSectionView,
  RowViewDto,
  SectionViewDto,
} from "@open-dpp/api-client";
import { computed } from "vue";
import { generateClassesForLayout } from "../lib/layout";

const props = defineProps<{ rowView: RowViewDto; isLastRow: boolean }>();
const fieldViews = computed<FieldViewDto[]>(() =>
  props.rowView.children.filter((c) => isDataFieldView(c)),
);
const subSectionViews = computed<SectionViewDto[]>(() =>
  props.rowView.children.filter((c) => isSectionView(c)),
);
</script>
