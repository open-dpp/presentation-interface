<template>
  <div class="flex flex-col items-center gap-5 p-3">
    <div class="flex w-full">
      <div class="w-full overflow-hidden bg-white shadow sm:rounded-lg p-3">
        <ProductHeader/>
      </div>
    </div>
    <Card v-if="indexStore.view !== 'client'" subtitle="Übersicht über die letzten 30 Tage" title="Statistiken">
      <Stats/>
    </Card>
    <ProductInformation/>
    <Card subtitle="Anhänge" title="Anhänge">
      <FileGrid/>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import {useRoute} from "vue-router";
import {onMounted} from "vue";
import axiosIns from "../lib/axios.ts";
import ProductInformation from "../components/ProductInformation.vue";
import FileGrid from "../components/FileGrid.vue";
import Stats from "../components/Stats.vue";
import ProductHeader from "../components/ProductHeader.vue";
import {useProductStore} from "../stores/product.ts";
import Card from "../components/Card.vue";
import {useIndexStore} from "../stores";
import {API_ROOT_URL} from "../const.ts";

const route = useRoute();

const productStore = useProductStore();
const indexStore = useIndexStore();

onMounted(async () => {
  const response = await axiosIns.get(`${API_ROOT_URL}/permalinks/${route.params.permalink}`);
  console.log(response.data);
  productStore.product = response.data.product;
});
</script>
