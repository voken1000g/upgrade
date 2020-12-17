<template>
  <div v-show="typeof status === 'number' && status >= 0" :class="txInfoClassArr" class="space-x-2">
    <div
         class="w-1/4 flex items-center justify-center"
    >
      <img v-if="status === 0"
           class="w-20 h-20"
           src="~/assets/image/spinner-gray.svg"
           alt="spinner">

      <img v-if="status === 1"
           class="w-20 h-20"
           src="~/assets/image/spinner-blue.svg"
           alt="spinner">

      <fa v-else-if="status === 2"
          class="mx-5 fa-3x"
          :icon="['fas', 'check-square']" />

      <fa v-else-if="status > 2"
          class="mx-5 fa-3x"
          :icon="['fas', 'times-circle']" />
    </div>

    <div class="w-full pt-3 pb-4">
      <div class="tx-title">
        {{ statusDisplay }}
      </div>

      <div v-if="hash" class="tx-hash">
        {{ hash }}
      </div>

      <div v-if="message" class="tx-message">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TxInfo",
  props: ['status', 'hash', 'confirmation', 'message'],
  computed: {
    fast() {
      return this.$store.state.fast
    },
    txInfoClassArr() {
      let arr = ['tx-info']

      if (this.status === 0) {
        arr.push('tx-info-pending')
      } else if (this.status === 1) {
        arr.push('tx-info-confirming')
      } else if (this.status === 2) {
        arr.push('tx-info-success')
      } else if (this.status > 2) {
        arr.push('tx-info-error')
      }

      return arr
    },

    statusDisplay() {
      if (this.status === 0) {
        return 'Pending...'
      } else if (this.status === 1) {
        return 'Confirming... ' + this.confirmation + ' blocks'
      } else if (this.status === 2) {
        return 'Success > ' + this.confirmation + ' blocks'
      } else if (this.status > 2) {
        return 'Error'
      }
    },

    hashDisplay() {
      if (this.hash) {
        return this.hash
      }

      return '...'
    }
  }
}
</script>

<style scoped>
.tx-info {
  @apply flex items-center;
  @apply pl-2 pr-5 rounded-lg text-left;
}

.tx-info-pending {
  @apply bg-gray-800 text-gray-50;
}

.tx-info-confirming {
  @apply bg-blue-700 text-blue-50;
}

.tx-info-success {
  @apply bg-green-700 text-green-50;
}

.tx-info-error {
  @apply bg-red-700 text-red-50;
}

.tx-title {
  @apply font-bold text-xl;
}

.tx-hash {
  @apply mt-1 break-all;
}

.tx-message {
  @apply mt-2 pt-2 border-t border-gray-300 text-sm break-all;
}
</style>
