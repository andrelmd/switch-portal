<template>
  <div class="flex justify-center w-full">
    <div class="wrapper w-1/2 mt-12">
      <div class="flex flex-direction-row w-full justify-between">
        <div>
          <h1 class="text-3xl">Portas do switch {{ id }}</h1>
        </div>
        <div>
          <DefaultButton :onClick="deleteDevice">
            Deletar dispositivo
          </DefaultButton>
        </div>
      </div>
      <div class="w-full bg-slate-700 min-h-16 rounded-lg text-slate-100 mt-8">
        <table
          class="w-full mx-0 border-1 border-emerald-500"
          v-show="!$fetch.pending"
        >
          <thead align="center">
            <tr
              class="border-b-2 rounded-lg border-y-emerald-500 justify-content-center"
            >
              <th class="p-4">Porta</th>
              <th class="py-4">Status</th>
              <th class="py-4">Velocidade</th>
              <th class="py-4">Controle de fluxo</th>
              <th class="py-4">Atualizar porta</th>
            </tr>
          </thead>
          <tbody align="center">
            <tr
              class="border-y-2 rounded-lg"
              v-for="port in ports"
              :key="port.number"
            >
              <th class="py-4">
                {{ port.number }}
              </th>
              <td class="py-4">
                <select class="bg-emerald-500 p-2" v-model="port.statusId">
                  <option
                    v-for="state in status"
                    :key="`state${state.id}`"
                    :value="state.id"
                    :selected="state.id == port.statusId"
                  >
                    {{ state.state }}
                  </option>
                </select>
              </td>
              <td class="py-4">
                <select class="bg-emerald-500 p-2" v-model="port.speedId">
                  <option
                    v-for="speed in speeds"
                    :key="`speed${speed.id}`"
                    :value="speed.id"
                    :selected="speed.id === port.speedId"
                  >
                    {{ speed.speed }}
                  </option>
                </select>
              </td>
              <td class="py-4">
                <select class="bg-emerald-500 p-2" v-model="port.flowControlId">
                  <option
                    v-for="flowControl in flowControls"
                    :key="`flowControl${flowControl.id}`"
                    :value="flowControl.id"
                  >
                    {{ flowControl.flow }}
                  </option>
                </select>
              </td>
              <td class="py-4">
                <button
                  :class="
                    loading
                      ? 'bg-red-500 rounded-lg p-2'
                      : 'bg-emerald-500 rounded-lg p-2'
                  "
                  @click="updatePort(port.number)"
                >
                  Atualizar
                </button>
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
import Vue from 'vue'
import DefaultTable from '../../components/DefaultTable.vue'
import DefaultButton from '~/components/DefaultButton.vue'
import { PortDto } from '../../dtos/PortDto'

interface StatusDTO {
  id: number
  state: string
  value: number
}

interface SpeedDTO {
  id: number
  speed: string
  value: number
}

interface FlowControl {
  id: number
  flow: string
  value: number
}

export default Vue.extend({
  name: 'DeviceIdPage',
  data() {
    return {
      ports: Array<PortDto>(),
      id: this.$route.params.id,
      status: Array<StatusDTO>(),
      speeds: Array<SpeedDTO>(),
      flowControls: Array<FlowControl>(),
      loading: false,
    }
  },
  async fetch() {
    this.getPorts()
    this.getStatus()
    this.getSpeeds()
    this.getFlowControl()
  },
  fetchOnServer: false,
  methods: {
    async getPorts() {
      const { $axios }: { $axios: AxiosStatic } = this.$nuxt.context
      $axios
        .get<{ data: Array<PortDto> }>(`/ports/${this.id}`, {
          headers: { 'Cache-Control': 'no-cache' },
        })
        .then((response) => (this.ports = response.data.data))
    },
    async getStatus() {
      const { $axios }: { $axios: AxiosStatic } = this.$nuxt.context
      $axios
        .get<{ data: Array<StatusDTO> }>('/ports/states')
        .then((response) => (this.status = response.data.data))
    },
    async getSpeeds() {
      const { $axios }: { $axios: AxiosStatic } = this.$nuxt.context
      $axios
        .get<{ data: Array<SpeedDTO> }>('/ports/speeds')
        .then((response) => (this.speeds = response.data.data))
    },
    async getFlowControl() {
      const { $axios }: { $axios: AxiosStatic } = this.$nuxt.context
      $axios
        .get<{ data: Array<FlowControl> }>('/ports/flow-control')
        .then((response) => (this.flowControls = response.data.data))
    },
    async updatePort(portNumber: number) {
      this.loading = true
      const { $axios }: { $axios: AxiosStatic } = this.$nuxt.context
      await $axios.patch(
        '/ports',
        this.ports.find((it) => it.number === portNumber),
      )
      await this.getPorts().then(() => (this.loading = false))
    },
    async deleteDevice() {
      const { $axios }: { $axios: AxiosStatic } = this.$nuxt.context
      $axios
        .delete(`/devices/${this.id}`)
        .then(() => this.$nuxt.context.redirect(`/devices`))
    },
  },

  components: { DefaultTable },
})
</script>
