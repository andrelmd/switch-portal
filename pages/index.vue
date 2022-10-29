<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  middleware: (context) => {
    context.redirect(`/devices`)
  },
})
</script>

<style global>
body {
  margin: 0;
}
</style>
