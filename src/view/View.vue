<template>
  <div class="flex flex-col items-center gap-5">
    <ViewInformation />
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { watch } from "vue";
import ViewInformation from "../components/ViewInformation.vue";
import { useViewStore } from "../stores/view";
import apiClient from "../lib/api-client";

const route = useRoute();
const router = useRouter();

const viewStore = useViewStore();

watch(
  () => route.params.permalink,
  async () => {
    const permalink = String(route.params.permalink);
    try {
      const response =
        await apiClient.dpp.uniqueProductIdentifiers.getView(permalink);
      if (response.status === 404) {
        await router.push({
          path: "404",
          query: {
            permalink: permalink,
          },
        });
        return;
      }
      viewStore.view = response.data;
    } catch (e) {
      await router.push({
        path: "404",
        query: {
          permalink: permalink,
        },
      });
      return;
    }
  },
  { immediate: true },
);
</script>
