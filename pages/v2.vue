<template>
  <div class="pb-12">
    <div class="font-light text-3xl text-gray-700 text-center tracking-tight">
      <div>Voken2.0</div>
      <div>{{ $t('Resale_or_Update_Program') }}</div>
    </div>

    <not-for-the-address v-if="$store.state.notForTheAddress"/>

    <div v-if="$store.state.account">
      <div v-if="$store.state.accountStatus.v2ResaleAppliedTimestamp > 0">
        <v2-resale-status />
      </div>

      <div v-if="$store.state.accountStatus.v2UpgradeAppliedTimestamp > 0">
        <v2-upgrade-status />
      </div>

      <!--  v2 Options  -->
      <div v-if="showV2Options">
        <div class="mt-8 font-mono text-center">
          <v2-audit />
          <deadline-countdown />
          <v2-resale />
          <v2-upgrade />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import V2Audit from '~/components/V2Audit'
import V2Resale from '~/components/V2Resale'
import V2Upgrade from '~/components/V2Upgrade'
import V2ResaleStatus from '~/components/V2ResaleStatus'
import V2UpgradeStatus from '~/components/V2UpgradeStatus'
import DeadlineCountdown from '@/components/DeadlineCountdown'
import NotForTheAddress from '@/components/NotForTheAddress'

export default {
  name: 'v2',
  layout: 'dapp',
  components: { NotForTheAddress, DeadlineCountdown, V2UpgradeStatus, V2ResaleStatus, V2Upgrade, V2Resale, V2Audit },
  mounted: async function() {
    await this.$store.state.dApp.getV1ResaleStatus()
    await this.$store.state.dApp.getV1UpgradeStatus()
    await this.$store.state.dApp.getV2ResaleStatus()
    await this.$store.state.dApp.getV2UpgradeStatus()
  },
  computed: {
    showV2Options() {
      return (
        this.$store.state.accountStatus.v2ResaleAppliedTimestamp === 0
        &&
        this.$store.state.accountStatus.v2UpgradeAppliedTimestamp === 0
        &&
        this.$store.state.accountStatus.v2Balance.gt(0)
      )
    }
  }
}
</script>
