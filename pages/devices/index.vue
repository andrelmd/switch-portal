<template>
  <div class="flex justify-center w-full">
    <div class="w-1/2 mt-12">
      <div class="flex flex-direction-row w-full justify-between mb-2">
        <div class="mr-4">
          <h1 class="text-3xl">Dispositivos</h1>
        </div>
        <div class="ml-4">
          <DefaultButton :onClick="goToCreateDevice"
            >Adicionar um dispositivo
          </DefaultButton>
        </div>
      </div>
      <div class="w-full bg-slate-700 min-h-16 rounded-lg text-slate-100 mt-8">
        <DefaultTable
          v-show="!$fetch.pending"
          :header="['ID', 'Endereço IP', 'Ultima atualização']"
          :rows="
            devices.map((device) => [
              device.id,
              device.ipAddress,
              device.updatedAt.toLocaleString(),
            ])
          "
          @onRowClick="handleRowClick"
          :hoverEffect="true"
          :firstColumnBold="true"
        ></DefaultTable>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { AxiosStatic } from 'axios'
import Vue from 'vue'
import DefaultButton from '../../components/DefaultButton.vue'
import { DeviceDto } from '../../dtos/DeviceDto'

export default Vue.extend({
  name: 'IndexDevicePage',
  data() {
    return {
      devices: Array<DeviceDto>(),
    }
  },
  async fetch() {
    const {
      $axios,
    }: {
      $axios: AxiosStatic
    } = this.$nuxt.context
    $axios
      .get<{
        data: Array<DeviceDto>
      }>('/devices', {
        headers: {
          'Cache-Control': 'no-cache',
        },
      })
      .then((response) => {
        this.devices = response.data.data.map(
          (rawData) => new DeviceDto(rawData),
        )
      })
  },
  fetchOnServer: false,
  methods: {
    goToPortsBySwitchId(id: number) {
      this.$nuxt.context.redirect(`/devices/${id}`)
    },
    goToCreateDevice() {
      this.$nuxt.context.redirect(`/devices/create`)
    },
    handleRowClick(rowIndex: number) {
      this.goToPortsBySwitchId(this.devices[rowIndex].id)
    },
  },
  components: { DefaultButton },
})
</script>
