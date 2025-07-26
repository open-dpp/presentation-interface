<script setup lang="ts">
import { DocumentTextIcon } from "@heroicons/vue/16/solid";
import { isRepeaterView, isSectionView } from "@open-dpp/api-client";
import SectionView from "./SectionView.vue";
import RowView from "./RowView.vue";
import { useViewStore } from "../stores/view";
import { computed } from "vue";

const viewStore = useViewStore();

const view = computed(() => viewStore.view);
</script>

<template>
  <div
    v-if="view"
    v-for="(node, index) in view.nodes"
    :key="index"
    class="overflow-hidden bg-white shadow sm:rounded-lg w-full"
  >
    <div class="flex flex-col gap-4">
      <div
        class="flex justify-between items-center border-b border-gray-900/5 bg-gray-50"
      >
        <div class="flex items-center gap-2">
          <div
            :class="[
              'bg-[#6BAD87]',
              'flex size-16 items-center justify-center',
            ]"
          >
            <component
              :is="DocumentTextIcon"
              class="size-6 text-white"
              aria-hidden="true"
            />
          </div>
          <div class="text-sm/6 font-medium text-gray-900">
            {{ node.name }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="isRepeaterView(node)" class="grid grid-cols-1 p-2">
      <RowView
        v-for="(row, index) in node.rows"
        :key="index"
        :row-view="row"
        :is-last-row="index === node.rows.length - 1"
        :id="`${node.name.toLowerCase().replace(/\s/g, '-')}`"
      />
    </div>
    <div
      v-if="isSectionView(node)"
      class="grid grid-cols-1 p-2"
      :id="`${node.name.toLowerCase().replace(/\s/g, '-')}`"
    >
      <SectionView v-if="isSectionView(node)" :section-view="node" />
    </div>
  </div>
</template>
