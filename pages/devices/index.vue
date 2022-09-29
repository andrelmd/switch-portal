<template>
  <div>
    <h1>Dispositivos</h1>
    <div>
      <table v-show="!$fetch.pending" name="device-table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Endereço IP</th>
            <th scope="col">Ultima atualização</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="device in devices"
            :key="device.id"
            @click="goToPortsBySwitchId(device.id)"
          >
            <th>
              {{ device.id }}
            </th>
            <td>
              {{ device.ipAddress }}
            </td>
            <td>
              {{ device.updatedAt.toLocaleString() }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { AxiosStatic } from 'axios'
import Vue from 'vue'
import { DeviceDto } from '../../dtos/DeviceDto'

export default Vue.extend({
  name: 'DevicePage',
  data() {
    return {
      devices: Array<DeviceDto>(),
    }
  },
  async fetch() {
    const { $axios }: { $axios: AxiosStatic } = this.$nuxt.context
    $axios
      .get<{ data: Array<DeviceDto> }>('/devices', {
        headers: {
          'Cache-Control': 'no-cache',
        },
      })
      .then((response) => {
        this.devices = response.data.data.map(
          (rawData) => new DeviceDto(rawData)
        )
      })
  },
  fetchOnServer: false,
  methods: {
    goToPortsBySwitchId(id: number) {
      this.$nuxt.context.redirect(`/devices/${id}`)
    },
  },
})
</script>
