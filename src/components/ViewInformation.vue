<template>
  <div class="overflow-hidden bg-white shadow sm:rounded-lg w-full">
    <div class="px-4 py-6 sm:px-6">
      <h3 class="text-base/7 font-semibold text-gray-900">
        Produkt Informationen
      </h3>
      <p class="mt-1 max-w-2xl text-sm/6 text-gray-500">Produktdetails</p>
    </div>
    <div v-if="view" class="border-t border-gray-100">
      <dl class="divide-y divide-gray-100">
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-900">Name</dt>
          <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            {{ view.name }}
          </dd>
        </div>
      </dl>
    </div>
  </div>
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
            :class="['bg-pink-500', 'flex size-16 items-center justify-center']"
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
      />
    </div>
    <div v-if="isSectionView(node)" class="grid grid-cols-1 p-2">
      <SectionView v-if="isSectionView(node)" :section-view="node" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useViewStore } from "../stores/product.ts";
import { isRepeaterView, isSectionView } from "../../../open-dpp-api-client";
import SectionView from "./SectionView.vue";
import RowView from "./RowView.vue";
import { DocumentTextIcon } from "@heroicons/vue/16/solid";

const viewStore = useViewStore();

const view = computed(() => viewStore.view);
</script>
