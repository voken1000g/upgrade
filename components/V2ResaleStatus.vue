<template>
  <div class="mt-8 py-6 px-4 bg-indigo-100 text-center">
    <div class="pi">
      {{ $moment($store.state.v2ResaleStatus.timestamp * 1000).fromNow() }}
    </div>

    <div class="mt-4 pi">
      {{ $t('you_ve_successfully_applied_for_resale') }}
    </div>

    <div class="mt-1 pv">
      <span>{{ v2Balance }}</span>
      <span class="text-lg">Voken2.0</span>
    </div>

    <div class="mt-4 pi">
      {{ $t('to_get') }}
    </div>
    <div class="mt-2 font-bold text-2xl text-indigo-800">
      ${{ v2USDAudit.toFixed(6) }} USD
    </div>
    <div class="pi">
      {{ $t('_higher_than_the_audited_cost_') }}
    </div>

    <div class="mt-8 pi">
      {{ $t('proportion_of_the_total_resale') }} ${{ totalResaleUSD }} USD
    </div>
    <div class="mt-1 pv">
      {{ resaleUSDPOT }}%
    </div>

    <div v-if="v2USDClaimed.gt(0) || v2USDQuota.gt(0) || txStatus >= 0" class="mt-12 border-t border-gray-300">
      <div v-if="v2USDClaimed.gt(0)">
        <div class="mt-4 pi">
          {{ $t('you_ve_already_claimed') }}
        </div>
        <div class="mt-1 pv">
          <span>{{ v2USDClaimed.toFixed(6) }}</span>
          <span class="text-lg">USD</span>
        </div>
      </div>

      <div v-if="v2USDQuota.gt(0)">
        <div class="mt-4 pi">
          {{ $t('now_you_can') }}
        </div>
        <button v-if="showBtn" class="mt-6 btn text-lg" @click="claimV2USD">
          {{ $t('Claim') }} {{ v2USDQuota }} USD
        </button>
      </div>

      <tx-info class="mt-6 mx-6"
               :status="txStatus"
               :hash="txHash"
               :confirmation="txConfirmation"
               :message="txMessage" />
    </div>
    <div v-else>
      <div class="mt-4 pt-6 pi border-t">
        {{ $t('You_could_claim_ETH_during_the_VokenTB_sale_progress') }}
      </div>
    </div>
  </div>
</template>

<script>
import fn from '~/utils/functions'
import TxInfo from '~/components/TxInfo'

export default {
  name: 'V2ResaleStatus',
  components: { TxInfo },
  data() {
    return {
      fn: fn,
      showBtn: true,
      txStatus: -1,
      txHash: null,
      txConfirmation: 0,
      txMessage: null
    }
  },
  computed: {
    v2Balance() {
      return fn.amountDisplay(this.$store.state.accountStatus.v2Balance, 6)
    },
    v2USDQuota() {
      return fn.amountDisplay(this.$store.state.v2ResaleStatus.usdQuota, 6)
    },
    v2USDAudit() {
      return fn.amountDisplay(this.$store.state.v2ResaleStatus.usdAudit, 6)
    },
    v2USDClaimed() {
      return fn.amountDisplay(this.$store.state.v2ResaleStatus.usdClaimed, 6)
    },
    totalResaleUSD() {
      return fn.amountDisplay(this.$store.state.status.usdAudit, 6)
    },
    resaleUSDPOT() {
      return this.$store.state.v2ResaleStatus.usdAudit
        .div(this.$store.state.status.usdAudit)
        .multipliedBy(100)
        .toFixed(6)
    },
  },
  methods: {
    async claimV2USD() {
      this.showBtn = false
      this.txStatus = 0
      this.txMessage = null

      this.$store
        .state
        .upgradeContract()
        .methods
        .claimV2USD()
        .send({ 'from': this.$store.state.account })
        .on('transactionHash', this.onTransactionHash)
        .on('receipt', this.onReceipt)
        .on('confirmation', this.onConfirmation)
        .on('error', this.onError)
    },
    async onTransactionHash(txHash) {
      this.txStatus = 0
      this.txHash = txHash
    },
    async onReceipt(receipt) {
      this.txMessage = null

      if (receipt.status) {
        this.txStatus = 1
      } else {
        this.txStatus = 3
      }
    },
    async onConfirmation(confirmation) {
      if (this.txStatus < 3 && confirmation < 16) {
        if (confirmation < 6) {
          this.txStatus = 1
        } else if (confirmation >= 6 && confirmation < 10) {
          this.txStatus = 2
        } else {
          this.txStatus = 2
          await this.$store.state.dApp.getSummary()
          await this.$store.state.dApp.getStatus()
          await this.$store.state.dApp.getV2ResaleStatus()
          await this.$store.state.dApp.getV2UpgradeStatus()
        }

        this.txConfirmation = confirmation
      }
    },
    async onError(error) {
      this.txStatus = 3
      this.txMessage = error.message
      this.showBtn = true
    }
  }
}
</script>

<style scoped>

</style>
