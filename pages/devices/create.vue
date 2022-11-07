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
              v-model="ipAddress"
              class="bg-emerald-500 text-black border-2 rounded"
              type="text"
              id="deviceIp"
            />
          </div>
          <div class="flex justify-between p-2">
            <label for="username">Nome de usuário:</label>
            <input
              v-model="username"
              class="bg-emerald-500 text-black border-2 rounded"
              type="text"
              id="username"
            />
          </div>
          <div class="flex justify-between p-2">
            <label for="password">Senha:</label>
            <input
              v-model="password"
              class="bg-emerald-500 text-black border-2 rounded"
              type="password"
              id="password"
            />
          </div>
        </form>
        <div class="flex w-full justify-center pb-4">
          <button
            :disabled="isLoading"
            class="bg-emerald-500 text-white p-2 rounded-lg"
            @click="onClick"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { AxiosStatic } from 'axios'
import Vue from 'vue'
import { DeviceDto } from '@/dtos/DeviceDto'

export default Vue.extend({
  name: 'DeviceCreatePage',
  data() {
    return {
      ipAddress: '',
      username: '',
      password: '',
      isLoading: false,
    }
  },
  async fetch() {},
  fetchOnServer: false,

  methods: {
    async onClick() {
      this.isLoading = true
      const { $axios }: { $axios: AxiosStatic } = this.$nuxt.context
      const deviceDto = DeviceDto.create(
        this.ipAddress,
        this.username,
        this.password,
      )
      console.log(deviceDto)
      $axios.post<{data: DeviceDto}>('/devices', deviceDto).then((res) => {
        this.isLoading = false
        this.$nuxt.context.redirect(`/devices/${res.data.data.id}`)
      })
    },
  },
})
</script>
