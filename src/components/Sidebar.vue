<template>
  <nav class="flex flex-1 flex-col divide-y divide-gray-200" aria-label="Sidebar">
    <div class="font-bold py-3 text-xl">Navigation</div>
    <ul role="list" class="-mx-2 space-y-1 pt-2">
      <li v-for="item in navigation" :key="item.name">
        <a :href="item.hash" :class="[isActive(item.hash) ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600', 'group flex gap-x-3 rounded-md p-2 pl-3 text-sm/6 font-semibold']">{{ item.name }}</a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import {useViewStore} from "../stores/view.ts";
import {computed} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
const viewStore = useViewStore();

const view = computed(() => viewStore.view);

const navigation = computed<Array<{ name: string, hash: string }>>(() => {
  const navItems = [{ name: 'Produktdetails', hash: '#product-details' }];
  view.value?.nodes?.forEach((node) => {
    navItems.push({
      name: node.name,
      hash: `#${node.name.toLowerCase().replace(/\s/g, '-')}`,
    });
  })
  return navItems;
});

const isActive = (hash: string) => {
  return router.currentRoute.value.hash === hash;
}
</script>