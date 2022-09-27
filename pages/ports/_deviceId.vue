<template>
  <div class="container mx-auto">
    <div class="flex items-center justify-between">
      <h1 class="font-bold text-2xl">Portas</h1>

      <p
        class="inline-flex items-center justify-center border focus:outline-none transition ease-in-out duration-150 text-white bg-indigo-600 hover:bg-indigo-800 border-indigo-600 hover:border-indigo-800 rounded text-sm px-4 py-2"
        @click="updatePorts"
        :disabled="!isUpdating"
      >
        Atualizar
      </p>
    </div>
    <div>
      <div>
        <table class="mt-4 min-w-full divide-y divide-gray-200 shadow">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="relative px-6 py-3">Porta</th>
              <th scope="col" class="relative px-6 py-3">Status</th>
              <th scope="col" class="relative px-6 py-3">Velocidade</th>
              <th scope="col" class="relative px-6 py-3">Controle de fluxo</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="port in ports" :key="port.number" class="bg-white">
              <td
                class="px-6 py-4 text-center text-sm font-medium text-gray-900"
              >
                {{ port.number }}
              </td>
              <td
                class="px-6 py-4 text-center text-sm font-medium text-gray-900"
              >
                <select v-model="port.statusId">
                  <option
                    v-for="state in states"
                    :key="`state${state.id}`"
                    :value="state.id"
                    :selected="state.id == port.stateId"
                  >
                    {{ state.value }}
                  </option>
                </select>
              </td>
              <td
                class="px-6 py-4 text-center text-sm font-medium text-gray-900"
              >
                <select v-model="port.speedId">
                  <option
                    v-for="speed in speeds"
                    :key="`speed${speed.id}`"
                    :value="speed.id"
                    :selected="speed.id === port.speedId"
                  >
                    {{ speed.id }}
                    {{ speed.value }}
                  </option>
                </select>
              </td>
              <td
                class="px-6 py-4 text-center text-sm font-medium text-gray-900"
              >
                <select v-model="port.flowControlId">
                  <option
                    v-for="flowControl in flowControls"
                    :key="`flowControl${flowControl.id}`"
                    :value="flowControl.id"
                  >
                    {{ flowControl.value }}
                  </option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { AxiosStatic } from 'axios'
import { PortDto } from '../../dtos/PortDto'

export default {
  data() {
    return {
      ports: Array<PortDto>(),
      deviceId: this.$route.params.deviceId,
      states: Array<{ id: number; value: string }>(),
      speeds: Array<{ id: number; value: string }>(),
      flowControls: Array<{ id: number; value: string }>(),
      isUpdating: false,
    }
  },
  async fetch() {
    this.getPorts()
    this.getStates()
    this.getSpeeds()
    this.getFlowControl()
  },
  fetchOnServer: false,

  methods: {
    async getPorts() {
      const { $axios }: { $axios: AxiosStatic } = this.$nuxt.context

      $axios
        .get<{ data: Array<PortDto> }>(`/ports/${this.deviceId}`, {
          headers: {
            'Cache-Control': 'no-cache',
          },
        })
        .then((response) => {
          this.ports = response.data.data
        })
    },
    async getStates() {
      const { $axios }: { $axios: AxiosStatic } = this.$nuxt.context
      $axios.get<any>('/ports/states').then((response) => {
        for (const key in response.data.data) {
          this.states.push({ id: Number(response.data.data[key]), value: key })
        }
      })
    },
    async getSpeeds() {
      const { $axios }: { $axios: AxiosStatic } = this.$nuxt.context
      $axios.get<any>('/ports/speeds').then((response) => {
        for (const key in response.data.data) {
          this.speeds.push({ id: Number(response.data.data[key]), value: key })
        }
      })
    },
    async getFlowControl() {
      const { $axios }: { $axios: AxiosStatic } = this.$nuxt.context
      $axios.get<any>('/ports/flow-control').then((response) => {
        for (const key in response.data.data) {
          this.flowControls.push({
            id: Number(response.data.data[key]),
            value: key,
          })
        }
      })
    },

    async updatePorts() {
      console.log('entrei')
      this.isUpdating = true
      const { $axios }: { $axios: AxiosStatic } = this.$nuxt.context
      await Promise.all(
        this.ports.map(async (port) => {
          await $axios.patch('/ports', port)
        }),
      )
      this.getPorts()
      this.isUpdating = false
    },
  },
}
</script>
