<template>
  <button @click="onClick" class="bg-emerald-500 text-white p-4 rounded-lg">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.component('DefaultButton', {
  props: {
    onClick: {
      type: Function as PropType<(payload: MouseEvent) => void>,
      required: true,
    },
  },
})
</script>
