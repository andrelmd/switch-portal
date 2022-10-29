<template>
  <table class="w-full mx-0 border-1 border-emerald-500">
    <thead align="center">
      <tr
        class="border-b-2 rounded-lg border-y-emerald-500 justify-content-center"
      >
        <th v-for="column in header" class="py-4">{{ column }}</th>
      </tr>
    </thead>

    <tbody align="center" class="justify-between w-full mx-0">
      <tr
        v-for="(row, index) in rows"
        class="border-y-2 rounded-lg"
        @click="$emit('onRowClick', index)"
        :class="{ 'hover:bg-emerald-500': hoverEffect }"
      >
        <th class="p-4">
          {{ row[0] }}
        </th>
        <td v-for="column in row.splice(1, row.length)" class="p-4">
          {{ column }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
export default Vue.component('DefaultTable', {
  props: {
    header: {
      type: Array as PropType<Array<string>>,
      required: true,
    },
    rows: {
      type: Array as PropType<Array<Array<any>>>,
      required: true,
    },
    hoverEffect: {
      type: Boolean,
      required: false,
    },
  },
})
</script>
