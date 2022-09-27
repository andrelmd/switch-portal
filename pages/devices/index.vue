<template>
  <div class="container mx-auto">
    <div class="flex items-center justify-between">
      <h1 class="font-bold text-2xl">Dispositivos</h1>
    </div>
    <div name="device-table-wrapper">
      <table
        v-show="!$fetch.pending"
        name="device-table"
        class="mt-4 min-w-full divide-y divide-gray-200 shadow"
      >
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="relative px-6 py-3">ID</th>
            <th scope="col" class="relative px-6 py-3">Endereço IP</th>
            <th scope="col" class="relative px-6 py-3">Ultima atualização</th>
          </tr>
        </thead>

        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="device in devices"
            :key="device.id"
            class="bg-white hover:bg-gray-200"
            @click="goToPortsBySwitchId(device.id)"
          >
            <th class="px-6 py-4 text-center text-sm font-medium text-gray-900">
              {{ device.id }}
            </th>
            <td class="px-6 py-4 text-center text-sm font-medium text-gray-900">
              {{ device.ipAddress }}
            </td>
            <td class="px-6 py-4 text-center text-sm font-medium text-gray-900">
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
import { DeviceDto } from '../../dtos/DeviceDto'

export default {
  name: 'devices',
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
          (rawData) => new DeviceDto(rawData),
        )
      })
  },
  fetchOnServer: false,
  methods: {
    goToPortsBySwitchId(id: number) {
      const context = this.$nuxt.context
      context.redirect(`/ports/${id}`)
    },
  },
}
</script>
