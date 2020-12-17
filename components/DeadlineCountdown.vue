<template>
  <div v-if="!$store.state.notForTheAddress"
       class="mt-8 py-6 font-sans text-center text-gray-600"
  >
    <div class="text-xl">
      {{ $t('The_deadline_for_apply_is') }}
    </div>
    <div class="mt-4">
      {{ this.$moment($store.state.status.deadline * 1000) }}
    </div>

    <div v-if="$moment($store.state.status.deadline * 1000).diff(new Date().getTime(), 'days') < 30"
         class="mt-2"
    >
      {{ $store.state.deadlineCountdown.d }} days
      {{ $store.state.deadlineCountdown.hh }}:{{ $store.state.deadlineCountdown.mm }}:{{ $store.state.deadlineCountdown.ss }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeadlineCountdown'
}
</script>

<style scoped>

</style>
