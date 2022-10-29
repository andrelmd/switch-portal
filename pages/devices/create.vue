<template>
  <div class="flex justify-center w-full">
    <div class="mt-12">
      <div>
        <h1>Adicionar novo dispositivo</h1>
      </div>
      <div class="bg-slate-700 w-full text-white rounded-lg">
        <form class="p-12">
          <div class="flex justify-between p-2">
            <label for="deviceIp">Endereço IP:</label>
            <input
              class="bg-emerald-500 text-black border-2 rounded"
              type="text"
              id="deviceIp"
            />
          </div>
          <div class="flex justify-between p-2">
            <label for="username">Nome de usuário:</label>
            <input
              class="bg-emerald-500 text-black border-2 rounded"
              type="text"
              id="username"
            />
          </div>
          <div class="flex justify-between p-2">
            <label for="password">Senha:</label>
            <input
              class="bg-emerald-500 text-black border-2 rounded"
              type="text"
              id="password"
            />
          </div>
        </form>
        <div class="flex w-full justify-center pb-4">
          <button class="bg-emerald-500 text-white p-2 rounded-lg">
            Adicionar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'DeviceCreatePage',
  data() {
    return {}
  },
  async fetch() {},
  fetchOnServer: false,

  methods: {},
})
</script>
