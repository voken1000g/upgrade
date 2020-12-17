<template>
  <div>
    <div class="mt-8 px-2 font-sans font-bold text-xl text-gray-800 text-left">
      {{ $t('Option1') }} {{ $t('Apply4resale') }}
    </div>

    <div class="mt-2 py-1 px-4 bg-gray-300 rounded-t-md text-gray-500 text-right">
      1 ETH = {{ resaleEtherUSDPrice }} USD {{ $t('_Fixed_') }}
    </div>

    <div class="py-6 bg-gray-100">
      <div class="pi">
        {{ $t('The_price_of_ETH_was') }}
      </div>

      <div class="mt-2 pi">
        {{ $t('if_you_take_this_option_to_apply_for_resale') }}
      </div>
      <div class="mt-2 pi">
        {{ $t('it_will_be_priced_at') }} {{ resaleEtherUSDPrice }} USD {{ $t('_higher_') }}
      </div>
      <div class="mt-2 pi">
        {{ $t('so_you_can_get') }} ${{ resaleEtherUSDPrice }} x {{ v2WeiAudit }} =
      </div>
      <div class="mt-2 font-bold text-2xl text-gray-800">
        ${{ v2USDResale }} USD
      </div>

      <button v-show="showBtn" class="mt-6 btn text-lg" @click="applyV2Resale">
        {{ $t('Apply4Resale') }}
      </button>

      <tx-info class="mt-6 mx-6"
               :status="txStatus"
               :hash="txHash"
               :confirmation="txConfirmation"
               :message="txMessage" />

      <div class="mt-6 pi">
        {{ $t('then_you_could_claim_USD_during_the_VokenTB_sale_progress') }}
      </div>
    </div>
  </div>
</template>

<script>
import TxInfo from '~/components/TxInfo'
import fn from '~/utils/functions'

export default {
  name: 'V2Resale',
  components: { TxInfo },
  data() {
    return {
      showBtn: true,
      txStatus: -1,
      txHash: null,
      txConfirmation: 0,
      txMessage: null
    }
  },
  computed: {
    resaleEtherUSDPrice() {
      return fn.amountDisplay(this.$store.state.status.resaleEtherUSDPrice, 6)
    },
    v2WeiAudit() {
      return fn.amountDisplay(this.$store.state.v2UpgradeStatus.weiAudit, 18)
    },
    v2USDResale() {
      return fn.amountDisplay(
        this.$store.state.v2UpgradeStatus.weiAudit.multipliedBy(this.$store.state.status.resaleEtherUSDPrice).div(10 ** 18),
        6,
        3
      )
    }
  },
  methods: {
    async applyV2Resale() {
      this.showBtn = false
      this.txStatus = 0
      this.txMessage = null

      await this.$store
        .state
        .upgradeContract()
        .methods
        .applyV2Resale()
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
          await this.$store.state.dApp.getStatus()
          await this.$store.state.dApp.getAccountStatus()
          await this.$store.state.dApp.getV2ResaleStatus()
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
