<template>
  <div>
    <div class="py-1 px-4 bg-gray-300 rounded-t-md text-gray-500">
      {{ $t('Private_placement_review') }}
    </div>

    <div class="py-6 bg-gradient-to-br from-gray-100 to-gray-50">
      <!--  private placement  -->
      <div class="mt-1 pi">
        {{ $t('You_ve_sent') }} {{ v1EtherPurchased }} ETH
      </div>
      <div class="mt-1 pi">
        {{ $t('You_ve_received') }} {{ v1EtherRewarded }} ETH
      </div>

      <!--  txn  -->
      <div class="mt-4 pi">
        <span>
          {{ v1TxsIn }} {{ $t('income_txs') }}
        </span>
        <span>
          {{ v1TxsOut }} {{ $t('outcome_txs') }}
        </span>
        <span>
          ...
        </span>
      </div>

      <div class="mt-4 pi">
        {{  $t('Now_you_are_holding') }}
      </div>

      <div class="pv">
        <span>{{ v1Balance }}</span>
        <span class="text-xl">Voken1.0</span>
      </div>

      <div class="mt-4 pi">
        {{ $t('POT35B') }}
      </div>

      <div class="pv">
        {{ v1POT35B }}%
      </div>
      <div class="-mt-1 pr-4 pi text-right">
        {{ $t('previous') }}
      </div>

      <div class="mt-4 pi">
        {{ $t('The_audited_cost_is') }}
      </div>
      <div class="pv">
        {{ v1EtherAudit }} ETH
      </div>
    </div>
  </div>
</template>

<script>
import fn from '../utils/functions'

export default {
  name: 'V1Audit',
  data() {
    return {
      fn: fn
    }
  },
  computed: {
    v1EtherPurchased() {
      return fn.amountDisplay(this.$store.state.v1UpgradeStatus.weiPurchased, 18)
    },
    v1EtherRewarded() {
      return fn.amountDisplay(this.$store.state.v1UpgradeStatus.weiRewarded, 18)
    },
    v1Balance() {
      return fn.amountDisplay(this.$store.state.accountStatus.v1Balance, 6)
    },
    v1POT35B() {
      return fn.amountDisplay(this.$store.state.accountStatus.v1Balance, 6)
        .div(350 * 10 ** 9)
        .multipliedBy(100)
        .toFixed(6)
    },
    v1TxsIn() {
      return this.$store.state.v1UpgradeStatus.txsIn
    },
    v1TxsOut() {
      return this.$store.state.v1UpgradeStatus.txsOut
    },
    v1EtherAudit() {
      return this.fn.amountDisplay(this.$store.state.v1UpgradeStatus.weiAudit, 18)
    }
  }
}
</script>

<style scoped>

</style>
