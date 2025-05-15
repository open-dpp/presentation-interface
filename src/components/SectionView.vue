<template>
  <div
    :class="[
      'grid items-center gap-1',
      generateClassesForLayout(props.sectionView.layout),
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
</template>

<script setup lang="ts">
import {
  FieldViewDto,
  isDataFieldView,
  isSectionView,
  SectionViewDto,
} from "@open-dpp/api-client";
import DataFieldView from "./DataFieldView.vue";
import { generateClassesForLayout } from "../lib/layout.ts";
import { computed } from "vue";

const props = defineProps<{ sectionView: SectionViewDto }>();
const fieldViews = computed<FieldViewDto[]>(() =>
  props.sectionView.children.filter((c) => isDataFieldView(c)),
);
const subSectionViews = computed<SectionViewDto[]>(() =>
  props.sectionView.children.filter((c) => isSectionView(c)),
);
</script>
