<template>
  <div class="mt-12 py-6 px-4 bg-gray-700 text-center">
    <div class="text-lg text-white">
      This program does not work for the address
    </div>
    <div class="mt-4 text-sm text-gray-300">
      {{ $store.state.account }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotForTheAddress',
  computed: {
    notForTheAddress() {
      return (
        this.$store.state.accountStatus.v1ResaleAppliedTimestamp === 0
        &&
        this.$store.state.accountStatus.v1UpgradeAppliedTimestamp === 0
        &&
        this.$store.state.accountStatus.v2ResaleAppliedTimestamp === 0
        &&
        this.$store.state.accountStatus.v2UpgradeAppliedTimestamp === 0
        &&
        this.$store.state.accountStatus.v1Balance.eq(0)
        &&
        this.$store.state.accountStatus.v2Balance.eq(0)
      )
    }
  }
}
</script>

<style scoped>

</style>
