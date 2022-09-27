<template>
  <div>
    <header class="bg-gray-800">
      <nav>
        <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div class="relative flex items-center justify-between h-16">
            <div class="flex-1 flex items-center items-stretch justify-start">
              <div class="flex-shrink-0 flex items-center">
                <img
                  class="block h-8 w-auto"
                  src="../static/sp.jpeg"
                  alt="Workflow"
                />
              </div>

              <div class="hidden sm:block sm:ml-6">
                <div class="flex space-x-4">
                  <NuxtLink
                    to="/devices"
                    :class="{
                      'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium':
                        $route.name === 'devices',
                      'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium':
                        $route.name !== 'devices',
                    }"
                    >Devices</NuxtLink
                  >
                </div>
              </div>
            </div>

            <div
              class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
            ></div>
          </div>
        </div>
      </nav>
    </header>

    <div class="max-w-7xl mx-auto p-4">
      <div class="mt-4">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  methods: {},
}
</script>
