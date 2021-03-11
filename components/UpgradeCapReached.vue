<template>
  <div class="mt-4 py-6 bg-gradient-to-r from-gray-700 to-gray-800 rounded-md font-mono text-white text-center pointer-events-none">
    <div class="font-sans font-bold text-lg">
      Upgrade Cap Reached
    </div>

    <div class="mt-6 text-sm text-gray-100">
      You can only apply for resale
    </div>
  </div>
</template>

<script>
import fn from '../utils/functions'

export default {
  name: 'UpgradeCapReached',
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
