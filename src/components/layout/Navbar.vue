<template>
  <Disclosure v-slot="{ open }" as="header" class="bg-white shadow-sm">
    <div
      class="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8"
    >
      <div class="relative flex h-16 justify-between">
        <div class="relative z-10 flex px-2 lg:px-0">
          <div class="flex shrink-0 items-center">
            <img
              :src="logo"
              alt="Your Company"
              class="h-8 w-auto hover:cursor-pointer"
              @click="goToApp"
            />
          </div>
        </div>
        <div
          class="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0"
        >
          <div class="w-full sm:max-w-xs">
            <label class="sr-only" for="search">Suche</label>
            <div class="relative">
              <div
                class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
              >
                <MagnifyingGlassIcon
                  aria-hidden="true"
                  class="h-5 w-5 text-gray-400"
                />
              </div>
              <input
                id="search"
                class="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                name="search"
                placeholder="Suche..."
                type="search"
              />
            </div>
          </div>
        </div>
        <div class="relative z-10 flex items-center lg:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-hidden focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open menu</span>
            <Bars3Icon v-if="!open" aria-hidden="true" class="block h-6 w-6" />
            <XMarkIcon v-else aria-hidden="true" class="block h-6 w-6" />
          </DisclosureButton>
        </div>
        <div class="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
          <button
            class="relative shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            type="button"
          >
            <span class="absolute -inset-1.5" />
            <span class="sr-only">View notifications</span>
            <BellIcon aria-hidden="true" class="h-6 w-6" />
          </button>

          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-4 shrink-0">
            <div>
              <MenuButton
                class="relative flex rounded-full bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span class="absolute -inset-1.5" />
                <span class="sr-only">Open user menu</span>
                <img :src="user.imageUrl" alt="" class="h-8 w-8 rounded-full" />
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-hidden"
              >
                <MenuItem
                  v-for="item in userNavigation"
                  :key="item.name"
                  v-slot="{ active }"
                >
                  <a
                    :class="[
                      active ? 'bg-gray-100 outline-hidden' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    :href="item.href"
                    >{{ item.name }}</a
                  >
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
      <nav aria-label="Global" class="hidden lg:flex lg:space-x-8 lg:py-2">
        <button
          v-for="item in navigation"
          :key="item.name"
          :aria-current="item.current ? 'page' : undefined"
          :class="[
            item.current
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900',
            'inline-flex items-center rounded-md px-3 py-2 text-sm font-medium',
          ]"
          @click="item.select"
        >
          {{ item.name }}
        </button>
      </nav>
    </div>

    <DisclosurePanel aria-label="Global" as="nav" class="lg:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          :aria-current="item.current ? 'page' : undefined"
          :class="[
            item.current
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900',
            'block rounded-md px-3 py-2 text-base font-medium',
          ]"
          as="a"
          @click="item.select"
          >{{ item.name }}
        </DisclosureButton>
      </div>
      <div class="border-t border-gray-200 pb-3 pt-4">
        <div class="flex items-center px-4">
          <div class="shrink-0">
            <img :src="user.imageUrl" alt="" class="h-10 w-10 rounded-full" />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800">
              {{ user.name }}
            </div>
            <div class="text-sm font-medium text-gray-500">
              {{ user.email }}
            </div>
          </div>
          <button
            class="relative ml-auto shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            type="button"
          >
            <span class="absolute -inset-1.5" />
            <span class="sr-only">View notifications</span>
            <BellIcon aria-hidden="true" class="h-6 w-6" />
          </button>
        </div>
        <div class="mt-3 space-y-1 px-2">
          <DisclosureButton
            v-for="item in userNavigation"
            :key="item.name"
            :href="item.href"
            as="a"
            class="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
          >
            {{ item.name }}
          </DisclosureButton>
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script lang="ts" setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import logo from "../../assets/logo.png";
import { useIndexStore } from "../../stores";
import { computed } from "vue";
import { MANAGEMENT_ROOT_URL } from "../../const";

const indexStore = useIndexStore();

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = computed(() => [
  {
    name: "Kontrollbehörde",
    select: () => (indexStore.view = "compliance"),
    current: indexStore.view === "compliance",
  },
  {
    name: "Endkunde",
    select: () => (indexStore.view = "client"),
    current: indexStore.view === "client",
  },
]);

const userNavigation = [
  { name: "Your Profile", href: `${MANAGEMENT_ROOT_URL}/settings` },
  { name: "Settings", href: `${MANAGEMENT_ROOT_URL}/settings` },
  { name: "Sign out", href: `${MANAGEMENT_ROOT_URL}/logout` },
];

const goToApp = () => {
  window.location.href = MANAGEMENT_ROOT_URL;
};
</script>
