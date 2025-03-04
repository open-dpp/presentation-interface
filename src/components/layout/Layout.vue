<template>
  <div>
    <div class="lg:px-72 pt-10">
      <div class="bg-white shadow-sm">
        <Navbar/>

        <main>
          <div class="px-4 sm:px-6 lg:px-8">
            <router-view/>
          </div>
        </main>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import Navbar from "./Navbar.vue";
</script>