<template>
  <div class="mt-8 py-6 px-4 bg-indigo-100 text-center">
    <div class="pi">
      {{ $moment($store.state.v2UpgradeStatus.timestamp * 1000).fromNow() }}
    </div>

    <div class="mt-4 pi">
      {{ $t('you_ve_successfully_upgraded') }}
    </div>
    <div class="mt-1 pv">
      <span>{{ v2Balance }}</span>
      <span class="text-lg">Voken2.0</span>
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
      {{ $t('upgraded_for') }}
    </div>
    <div class="mt-1 pv">
      <span>{{ v2WeiAudit }}</span>
      <span class="text-lg">ETH</span>
    </div>
    <div class="-mt-1 pr-4 pi text-right">
      {{ $t('audited_cost') }}
    </div>

    <div class="mt-4 pi">
      {{ $t('upgraded_at') }}
    </div>
    <div class="mt-1 pv">
      <span>{{ v2EtherUSDPrice }}</span>
      <span class="text-lg">USD/ETH</span>
    </div>

    <div class="mt-4 pi">
      {{ $t('received') }} ${{ v2EtherUSDPrice }} x {{ v2WeiAudit }} / {{ v2VokenUSDPrice }} =
    </div>
    <div class="mt-1 pv">
      <span>{{ v2Claim }}</span>
      <span class="text-lg">VokenTB</span>
    </div>

    <div class="mt-4 pi">
      {{ $t('word_and') }}
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

    <div class="mt-12 border-t border-indigo-300">
    </div>

    <div class="mt-4 pi">
      >>> {{ $t('new_POT21M') }}
    </div>
    <div class="mt-1 pv">
      {{ vokenTbPOT210M }}%
    </div>
  </div>
</template>

<script>
import fn from '~/utils/functions'

export default {
  name: 'V2UpgradeStatus',
  computed: {
    v2Balance() {
      return fn.amountDisplay(this.$store.state.accountStatus.v2Balance, 6)
    },
    v2POT35B() {
      return this.v2Balance.div(35 * 10 ** 7).toFixed(6)
    },
    v2WeiAudit() {
      return fn.amountDisplay(this.$store.state.v2UpgradeStatus.weiAudit, 18)
    },
    v2EtherUSDPrice() {
      return fn.amountDisplay(this.$store.state.v2UpgradeStatus.etherUSDPrice, 6, 3)
    },
    v2VokenUSDPrice() {
      return fn.amountDisplay(this.$store.state.v2UpgradeStatus.vokenUSDPrice, 6, 3)
    },
    v2USDUpgrade() {
      return fn.amountDisplay(
        this.$store.state.v2UpgradeStatus.weiAudit.multipliedBy(this.$store.state.v2UpgradeStatus.etherUSDPrice).div(10 ** 18),
        6,
        3
      )
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
    vokenTbPOT210M() {
      return this.$store.state.v2UpgradeStatus.claim
        .plus(this.$store.state.v2UpgradeStatus.bonus)
        .div(10 ** 9)
        .div(210 * 10 ** 4)
        .toFixed(6)
    },
  }
}
</script>

<style scoped>

</style>
