<template>
  <div class="mt-8 py-6 px-4 bg-gray-50 text-center">
    <div class="pi">
      {{ $moment($store.state.v1UpgradeStatus.timestamp * 1000).fromNow() }}
    </div>

    <div class="mt-4 pi">
      {{ $t('you_ve_successfully_upgraded') }}
    </div>
    <div class="mt-1 pv">
      <span>{{ v1Balance }}</span>
      <span class="text-lg">Voken1.0</span>
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
      {{ $t('upgraded_for') }}
    </div>
    <div class="mt-1 pv">
      <span>{{ v1WeiAudit }}</span>
      <span class="text-lg">ETH</span>
    </div>
    <div class="-mt-1 pr-4 pi text-right">
      {{ $t('audited_cost') }}
    </div>

    <div class="mt-4 pi">
      {{ $t('upgraded_at') }}
    </div>
    <div class="mt-1 pv">
      <span>{{ v1EtherUSDPrice }}</span>
      <span class="text-lg">USD/ETH</span>
    </div>

    <div class="mt-4 pi">
      {{ $t('received') }} ${{ v1EtherUSDPrice }} x {{ v1WeiAudit }} / {{ v1VokenUSDPrice }} =
    </div>
    <div class="mt-1 pv">
      <span>{{ v1Claim }}</span>
      <span class="text-lg">VokenTB</span>
    </div>

    <div class="mt-4 pi">
      {{ $t('word_and') }}
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
    <div class="mt-2 font-bold text-2xl text-gray-800">
      {{ v1Total }} VokenTB
    </div>

    <div class="mt-12 border-t border-gray-300">
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
  name: 'V1UpgradeStatus',
  computed: {
    v1Balance() {
      return fn.amountDisplay(this.$store.state.accountStatus.v1Balance, 6)
    },
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
    v1POT35B() {
      return fn.amountDisplay(this.$store.state.accountStatus.v1Balance, 6)
        .div(350 * 10 ** 9)
        .multipliedBy(100)
        .toFixed(6)
    },
    vokenTbPOT210M() {
      return this.$store.state.v1UpgradeStatus.claim
        .plus(this.$store.state.v1UpgradeStatus.bonus)
        .div(10 ** 9)
        .div(210 * 10 ** 4)
        .toFixed(6)
    },
  }
}
</script>

<style scoped>

</style>
