<template>
  <div>
    <h1>Switch {{ id }}</h1>
    <div>
      <h2>Portas</h2>
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>Porta</th>
            <th>Status</th>
            <th>Velocidade</th>
            <th>Controle de fluxo</th>
            <th>Atualizar porta</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="port in ports" :key="port.number">
            <td>
              {{ port.number }}
            </td>
            <td>
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
            <td>
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
            <td>
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
            <td>
              <button @click="updatePort(port.number)">Atualizar</button>
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
import { PortDto } from '../../dtos/PortDto'

export default Vue.extend({
  name: 'DeviceIdPage',
  data() {
    return {
      ports: Array<PortDto>(),
      id: this.$route.params.id,
      states: Array<{ id: number; value: string }>(),
      speeds: Array<{ id: number; value: string }>(),
      flowControls: Array<{ id: number; value: string }>(),
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
        .get<{ data: Array<PortDto> }>(`/ports/${this.id}`, {
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

    async updatePort(portNumber: number) {
      const { $axios }: { $axios: AxiosStatic } = this.$nuxt.context
      await $axios.patch(
        '/ports',
        this.ports.find((it) => it.number === portNumber)
      )
      await this.getPorts()
    },
  },
})
</script>
