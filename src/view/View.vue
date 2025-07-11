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
import { onMounted } from "vue";
import ViewInformation from "../components/ViewInformation.vue";
import VerificationHeader from "../components/VerificationHeader.vue";
import { useViewStore } from "../stores/product";
import apiClient from "../lib/api-client";
import { useIndexStore } from "../stores";

const route = useRoute();

const viewStore = useViewStore();
const indexStore = useIndexStore();

onMounted(async () => {
  const response = await apiClient.dpp.uniqueProductIdentifiers.getView(
    String(route.params.permalink),
  );
  viewStore.view = response.data;
});
</script>
