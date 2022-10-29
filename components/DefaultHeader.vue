<template>
  <div class="shadow-xl w-full h-auto h-28">
    <nav class="bg-slate-700 list-none m-0 p-0 h-full">
      <li class="float-left h-full">
        <!-- <NuxtLink
          :class="
            this.$route.path === '/'
              ? 'block p-8 m-4 tex text-white bg-emerald-500 rounded-3xl'
              : 'block p-8 m-4 tex text-white'
          "
          to="/"
          >Home</NuxtLink
        > -->
      </li>
      <li class="float-left h-full">
        <NuxtLink
          :class="
            this.$route.path.includes('/devices')
              ? 'block p-8 m-4 tex text-white bg-emerald-500 rounded-3xl'
              : 'block p-8 m-4 tex text-white'
          "
          to="/devices"
          >Dispositivos</NuxtLink
        >
      </li>
    </nav>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.component('DefaultHeader', {})
</script>
