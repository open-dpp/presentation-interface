<template>
  <div class="flex flex-col items-center gap-5 p-3">
    <div
      v-if="indexStore.view !== 'client'"
      title="Certification"
      class="flex w-full"
    >
      <div class="w-full overflow-hidden bg-white shadow-sm sm:rounded-lg p-3">
        <VerificationHeader />
      </div>
    </div>
    <ViewInformation />
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { watch } from "vue";
import ViewInformation from "../components/ViewInformation.vue";
import VerificationHeader from "../components/VerificationHeader.vue";
import { useViewStore } from "../stores/product.ts";
import apiClient from "../lib/api-client.ts";
import { useIndexStore } from "../stores";

const route = useRoute();

const viewStore = useViewStore();
const indexStore = useIndexStore();

watch(
  () => route.params.permalink,
  async () => {
    const response = await apiClient.uniqueProductIdentifiers.getView(
      String(route.params.permalink),
    );
    viewStore.view = response.data;
  },
  { immediate: true },
);
</script>
