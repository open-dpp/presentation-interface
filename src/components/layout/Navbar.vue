<template>
  <Disclosure as="header" class="bg-white shadow-sm">
    <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
      <div class="relative flex h-32 justify-between">
        <div class="relative z-10 flex px-2 lg:px-0">
          <div class="flex shrink-0 items-center">
            <img class="h-12 w-auto" src="../../assets/logo-with-text.svg" alt="open-dpp GmbH" />
          </div>
        </div>
        <div class="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
          <button type="button" class="relative shrink-0 rounded-md bg-[#A2C7AB] p-3 text-black hover:cursor-pointer text-sm" @click="backToApp">
            <span class="absolute -inset-1.5" />
            <span class="sr-only">back to app</span>
            <span>Zurück zur App</span>
          </button>
        </div>
      </div>
    </div>
  </Disclosure>
</template>

<script lang="ts" setup>
import { Disclosure } from '@headlessui/vue'

const backToApp = () => {
  window.location.href = 'https://admin.cloud.open-dpp.de';
}
</script>