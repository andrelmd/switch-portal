<template>
  <NuxtRedirect to="/switches"></NuxtRedirect>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  middleware(context) {
    return context.redirect('/devices')
  },
})
</script>
