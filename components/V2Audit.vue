<template>
  <div>
    <div class="py-1 px-4 bg-gray-300 rounded-t-md text-gray-500">
      {{ $t('Private_placement_review') }}
    </div>

    <div class="py-6 bg-gradient-to-br from-gray-100 to-gray-50">

      <!--  v1  -->
      <div v-if="$store.state.accountStatus.v1Balance.gt(0)">
        <div class="px-4 text-gray-600 text-left">
          Voken1.0
        </div>

        <!--  private placement  -->
        <div class="mt-1 pi" v-if="$store.state.v1UpgradeStatus.weiPurchased.gt(0)">
          {{ $t('You_ve_sent') }} {{ v1EtherPurchased }} ETH
        </div>
        <div class="mt-1 pi" v-if="$store.state.v1UpgradeStatus.weiRewarded.gt(0)">
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
      </div>

      <!--  v2  -->
      <div v-if="$store.state.accountStatus.v1Balance.gt(0)" class="mt-6 px-4 text-gray-600 text-left">
        Voken2.0
      </div>

      <!--  private placement  -->
      <div class="mt-1 pi" v-if="$store.state.v2UpgradeStatus.weiPurchased.gt(0)">
        {{ $t('You_ve_sent') }} {{ v2EtherPurchased }} ETH
      </div>
      <div class="mt-1 pi" v-if="$store.state.v2UpgradeStatus.weiPurchased.gt(0)">
        {{ $t('You_ve_received') }} {{ v2EtherRewarded }} ETH
      </div>

      <!--  txn  -->
      <div class="mt-4">
        <div v-if="$store.state.accountStatus.v1Balance.eq(0)" class="mt-2 pi">
          {{ $t('After_migrated_to_Voken2') }}
        </div>
        <div class="mt-2 pi">
          <span>
            {{ v2TxsIn }} {{ $t('income_txs') }}
          </span>
          <span>
            {{ v2TxsOut }} {{ $t('outcome_txs') }}
          </span>
          <span>
            ...
          </span>
        </div>
      </div>

      <!--  Always shown  -->
      <div class="mt-4 pi">
        {{  $t('Now_you_are_holding') }}
      </div>

      <div class="pv">
        <span>{{ v2Balance }}</span>
        <span class="text-xl">Voken2.0</span>
      </div>

      <div class="mt-4 pi">
        {{ $t('POT35B') }}
      </div>
      <div class="pv">
        {{ v2POT35B }}%
      </div>
      <div class="-mt-1 pr-4 pi text-right">
        {{ $t('previous') }}
      </div>

      <div class="mt-4 pi">
        {{ $t('The_audited_cost_is') }}
      </div>

      <div class="pv">
        {{ v2WeiAudit }} ETH
      </div>
    </div>
  </div>
</template>

<script>
import fn from '~/utils/functions'

export default {
  name: 'V2Audit',
  computed: {
    v1EtherPurchased() {
      return fn.amountDisplay(this.$store.state.v1UpgradeStatus.weiPurchased, 18)
    },
    v1EtherRewarded() {
      return fn.amountDisplay(this.$store.state.v1UpgradeStatus.weiRewarded, 18)
    },
    v1TxsIn() {
      return this.$store.state.v1UpgradeStatus.txsIn
    },
    v1TxsOut() {
      return this.$store.state.v1UpgradeStatus.txsOut
    },

    v2EtherPurchased() {
      return fn.amountDisplay(this.$store.state.v2UpgradeStatus.weiPurchased, 18)
    },
    v2EtherRewarded() {
      return fn.amountDisplay(this.$store.state.v2UpgradeStatus.weiRewarded, 18)
    },
    v2TxsIn() {
      return this.$store.state.v2UpgradeStatus.txsIn
    },
    v2TxsOut() {
      return this.$store.state.v2UpgradeStatus.txsOut
    },

    v2Balance() {
      return fn.amountDisplay(this.$store.state.accountStatus.v2Balance, 6)
    },
    v2POT35B() {
      return this.v2Balance.div(35 * 10 ** 7).toFixed(6)
    },
    v2WeiAudit() {
      return fn.amountDisplay(this.$store.state.v2UpgradeStatus.weiAudit, 18)
    },
  }
}
</script>

<style scoped>

</style>
