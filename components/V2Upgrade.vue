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
        1 ETH = {{ v2EtherUSDPrice }} USD
        <span v-if="$store.state.blockNumber > 0">
          (#{{ $store.state.blockNumber }})
        </span>
      </div>

      <div class="py-6 bg-gradient-to-b from-indigo-100 to-indigo-200">
        <div class="pi">
          {{ $t('If_you_apply_for_upgrade_to_VokenTB') }}
        </div>

        <div class="mt-2 pi">
          {{ $t('you_can_convert_this') }} {{ v2WeiAudit }} ETH {{ $t('to_VokenTB_at_price') }}
        </div>

        <div class="mt-1 pv">
          ${{ v2EtherUSDPrice }} USD/ETH
        </div>
        <div class="-mt-1 pr-4 pi text-right">
          {{ $t('realtime_price') }}
        </div>

        <div class="mt-2 pi">
          {{ $t('That_is') }} ${{ v2EtherUSDPrice }} x {{ v2WeiAudit }} =
        </div>

        <div class="pv">
          ${{ v2USDUpgrade }} USD
        </div>

        <div class="mt-4 pi">
          {{ $t('After_upgraded_you_will_get') }} ${{ v2USDUpgrade }} / ${{ v2VokenUSDPrice }}
        </div>

        <div class="mt-1 pv">
          <span>{{ v2Claim }}</span>
          <span class="text-lg">VokenTB</span>
        </div>

        <div class="mt-4 pi">
          {{ $t('and_you_can_get_an_additional') }}
        </div>

        <div class="mt-1 pv">
          <span>{{ v2Bonus }}</span>
          <span class="text-lg">VokenTB</span>
        </div>

        <div class="-mt-1 pr-4 pi text-right">
          {{ $t('as_bonuses') }}
        </div>

        <div class="mt-4 pi">
          {{ $t('Totally') }}
        </div>

        <div class="mt-2 font-bold text-2xl text-indigo-800">
          {{ v2Total }} VokenTB
        </div>

        <div class="mt-4 pi">
          >>> {{ $t('POT21M') }}
        </div>

        <div class="mt-1 pv">
          {{ vokenTb2POT210M }}%
        </div>
        <div class="-mt-1 pr-4 pi text-right">
          {{ $t('new') }}
        </div>


        <button v-show="showBtn" class="mt-6 btn text-lg" @click="applyV2Upgrade">
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
import fn from '~/utils/functions'
import TxInfo from '~/components/TxInfo'

export default {
  name: 'V2Upgrade',
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
    v2WeiAudit() {
      return fn.amountDisplay(this.$store.state.v2UpgradeStatus.weiAudit, 18)
    },
    v2USDUpgrade() {
      return fn.amountDisplay(
        this.$store.state.v2UpgradeStatus.weiAudit.multipliedBy(this.$store.state.v2UpgradeStatus.etherUSDPrice).div(10 ** 18),
        6,
        3
      )
    },
    v2EtherUSDPrice() {
      return fn.amountDisplay(this.$store.state.v2UpgradeStatus.etherUSDPrice, 6, 3)
    },
    v2VokenUSDPrice() {
      return fn.amountDisplay(this.$store.state.v2UpgradeStatus.vokenUSDPrice, 6, 3)
    },
    v2Claim() {
      return fn.amountDisplay(this.$store.state.v2UpgradeStatus.claim, 9, 3)
    },
    v2Bonus() {
      return fn.amountDisplay(this.$store.state.v2UpgradeStatus.bonus, 9, 3)
    },
    v2Total() {
      return fn.amountDisplay(
        this.$store.state.v2UpgradeStatus.claim.plus(this.$store.state.v2UpgradeStatus.bonus),
        9,
        3
      )
    },
    vokenTb2POT210M() {
      return this.$store.state.v2UpgradeStatus.claim
        .plus(this.$store.state.v2UpgradeStatus.bonus)
        .div(10 ** 9)
        .div(210 * 10 ** 4)
        .toFixed(6)
    },
  },
  methods: {
    async applyV2Upgrade() {
      this.showBtn = false
      this.txStatus = 0
      this.txMessage = null

      await this.$store
        .state
        .upgradeContract()
        .methods
        .applyV2Upgrade()
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
