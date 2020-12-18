<template>
  <div class="py-6 bg-gradient-to-r from-orange-400 to-pink-500 rounded-md font-mono text-white text-center pointer-events-none">
    <div class="font-sans font-hairline text-lg">
      Upgrade Progress
    </div>

    <div class="mt-6">
      <div class="font-bold">
        <span class="text-4xl">{{ $store.state.status.processInPercent.toFixed(2) }}</span><span class="text-2xl">%</span>
      </div>
      <div>
        completed
      </div>
    </div>

    <div class="mt-10 text-sm text-pink-100">
      Totally 21,000,000 VokenTB for upgrade
    </div>
  </div>
</template>

<script>
import fn from '../utils/functions'

export default {
  name: 'UpgradeProcess',
  data() {
    return {
      fn: fn
    }
  },
  computed: {
    vokenUpgradedCap() {
      return process.env.vokenUpgradedCap
    }
  }
}
</script>

<style scoped>

</style>
