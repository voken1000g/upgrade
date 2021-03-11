<template>
  <div>
    <div class="mt-8 px-2 font-sans font-bold text-xl text-gray-800 text-left">
      {{ $t('Option2') }} {{ $t('Apply4upgrade2VokenTB') }}
    </div>

    <div v-if="$store.state.accountStatus.canOnlyResale"
         class="mt-6 py-4 bg-red-50 border border-red-400 font-bold text-red-600"
    >
      {{ $t('You_can_only_apply_for_resale') }}
    </div>

    <div v-else-if="$store.state.status.vokenTbTotal.lt('21000000000000000')" class="mt-2">
      <div class="py-1 px-4 bg-indigo-200 rounded-t-md text-indigo-600 text-right">
        1 ETH = {{ v1EtherUSDPrice }} USD
        <span v-if="$store.state.blockNumber > 0">
          (#{{ $store.state.blockNumber }})
        </span>
      </div>

      <div class="py-6 bg-gradient-to-b from-indigo-100 to-indigo-200">
        <div class="pi">
          {{ $t('If_you_apply_for_upgrade_to_VokenTB') }}
        </div>

        <div class="mt-2 pi">
          {{ $t('you_can_convert_this') }} {{ v1WeiAudit }} ETH {{ $t('to_VokenTB_at_price') }}
        </div>

        <div class="mt-1 pv">
          ${{ v1EtherUSDPrice }} USD/ETH
        </div>
        <div class="-mt-1 pr-4 pi text-right">
          {{ $t('realtime_price') }}
        </div>

        <div class="mt-2 pi">
          {{ $t('That_is') }} ${{ v1EtherUSDPrice }} x {{ v1WeiAudit }} =
        </div>

        <div class="pv">
          ${{ v1USDUpgrade }} USD
        </div>

        <div class="mt-4 pi">
          {{ $t('After_upgraded_you_will_get') }} ${{ v1USDUpgrade }} / ${{ v1VokenUSDPrice }}
        </div>

        <div class="mt-1 pv">
          <span>{{ v1Claim }}</span>
          <span class="text-lg">VokenTB</span>
        </div>

        <div class="mt-4 pi">
          {{ $t('and_you_can_get_an_additional') }}
        </div>

        <div class="mt-1 pv">
          <span>{{ v1Bonus }}</span>
          <span class="text-lg">VokenTB</span>
        </div>

        <div class="-mt-1 pr-4 pi text-right">
          {{ $t('as_bonuses') }}
        </div>

        <div class="mt-4 pi">
          {{ $t('Totally') }}
        </div>

        <div class="mt-2 font-bold text-2xl text-indigo-800">
          {{ v1Total }} VokenTB
        </div>

        <div class="mt-4 pi">
          >>> {{ $t('POT21M') }}
        </div>

        <div class="mt-1 pv">
          {{ vokenTbPOT210M }}%
        </div>
        <div class="-mt-1 pr-4 pi text-right">
          {{ $t('new') }}
        </div>

        <button v-show="showBtn" class="mt-6 btn text-lg" @click="applyV1Upgrade">
          {{ $t('Apply4Upgrade') }}
        </button>

        <tx-info class="mt-6 mx-6"
                 :status="txStatus"
                 :hash="txHash"
                 :confirmation="txConfirmation"
                 :message="txMessage" />
      </div>
    </div>

    <upgrade-cap-reached v-else />
  </div>
</template>

<script>
import fn from '../utils/functions'
import TxInfo from '~/components/TxInfo'

export default {
  name: 'V1Upgrade',
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
    v1WeiAudit() {
      return fn.amountDisplay(this.$store.state.v1UpgradeStatus.weiAudit, 18)
    },
    v1EtherUSDPrice() {
      return fn.amountDisplay(this.$store.state.v1UpgradeStatus.etherUSDPrice, 6, 3)
    },
    v1VokenUSDPrice() {
      return fn.amountDisplay(this.$store.state.v1UpgradeStatus.vokenUSDPrice, 6, 3)
    },
    v1USDUpgrade() {
      return fn.amountDisplay(
        this.$store.state.v1UpgradeStatus.weiAudit.multipliedBy(this.$store.state.v1UpgradeStatus.etherUSDPrice).div(10 ** 18),
        6,
        3
      )
    },
    v1Claim() {
      return fn.amountDisplay(this.$store.state.v1UpgradeStatus.claim, 9, 3)
    },
    v1Bonus() {
      return fn.amountDisplay(this.$store.state.v1UpgradeStatus.bonus, 9, 3)
    },
    v1Total() {
      return fn.amountDisplay(
        this.$store.state.v1UpgradeStatus.claim.plus(this.$store.state.v1UpgradeStatus.bonus),
        9,
        3
      )
    },
    vokenTbPOT210M() {
      return this.$store.state.v1UpgradeStatus.claim
        .plus(this.$store.state.v1UpgradeStatus.bonus)
        .div(10 ** 9)
        .div(210 * 10 ** 4)
        .toFixed(6)
    },
  },
  methods: {
    async applyV1Upgrade() {
      this.showBtn = false
      this.txStatus = 0
      this.txMessage = null

      await this.$store
        .state
        .upgradeContract()
        .methods
        .applyV1Upgrade()
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
          await this.$store.state.dApp.getV1UpgradeStatus()
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
