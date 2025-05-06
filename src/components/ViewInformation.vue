<template>
  <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg w-full">
    <div class="px-4 py-6 sm:px-6">
      <h3 class="text-base/7 font-semibold text-gray-900">Produkt Informationen</h3>
      <p class="mt-1 max-w-2xl text-sm/6 text-gray-500">Produktdetails</p>
    </div>
    <div v-if="view" class="border-t border-gray-100">
      <dl class="divide-y divide-gray-100">
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-900">Name</dt>
          <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{{ view.name }}</dd>
        </div>
      </dl>
    </div>
  </div>
  <div v-if="view" v-for="section of view.sections" class="overflow-hidden bg-white shadow-sm sm:rounded-lg w-full">
    <div class="px-4 py-6 sm:px-6">
      <h3 class="text-base/7 font-semibold text-gray-900">{{section.name}}</h3>
    </div>
    <div v-for="row of section.rows">
      <div v-for="field of row.fields" class="border-t border-gray-100">
        <dl class="divide-y divide-gray-100">
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-900">{{field.name}}</dt>
            <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{{ field.value }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed} from "vue";
import {useViewStore} from "../stores/product.ts";

const viewStore = useViewStore();

const view = computed(() => viewStore.view);
</script>