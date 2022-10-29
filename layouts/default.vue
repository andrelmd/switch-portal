<template>
  <div>
    <DefaultHeader />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DefaultHeader from '../components/DefaultHeader.vue'

export default Vue.extend({
  name: 'IndexPage',
  components: { DefaultHeader },
})
</script>

<style></style>
