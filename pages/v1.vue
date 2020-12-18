<template>
  <div class="pb-12">
    <div class="font-light text-3xl text-gray-700 text-center tracking-tight">
      <div>Voken1.0</div>
      <div>{{ $t('Resale_or_Update_Program') }}</div>
    </div>

    <not-for-the-address v-if="$store.state.notForTheAddress"/>

    <div v-if="$store.state.account">
      <div v-if="$store.state.accountStatus.v1ResaleAppliedTimestamp > 0">
        <v1-resale-status />
      </div>

      <div v-if="$store.state.accountStatus.v1UpgradeAppliedTimestamp > 0">
        <v1-upgrade-status />
      </div>

      <!--  v1 Options  -->
      <div v-if="showV1Options">
        <div class="mt-8 font-mono text-center">
          <v1-audit />
          <deadline-countdown />
          <upgrade-process class="mt-4 mb-12 "/>
          <v1-resale />
          <v1-upgrade />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import V1Audit from '~/components/V1Audit'
import V1Resale from '~/components/V1Resale'
import V1Upgrade from '~/components/V1Upgrade'
import V1ResaleStatus from '~/components/V1ResaleStatus'
import V1UpgradeStatus from '~/components/V1UpgradeStatus'
import DeadlineCountdown from '@/components/DeadlineCountdown'
import NotForTheAddress from '@/components/NotForTheAddress'
import UpgradeProcess from '~/components/UpgradeProcess'

export default {
  name: 'v1',
  layout: 'dapp',
  components: { UpgradeProcess, NotForTheAddress, DeadlineCountdown, V1UpgradeStatus, V1ResaleStatus, V1Upgrade, V1Resale, V1Audit },
  mounted: async function() {
    await this.$store.state.dApp.getV1ResaleStatus()
    await this.$store.state.dApp.getV1UpgradeStatus()
  },
  computed: {
    showV1Options() {
      return (
        this.$store.state.accountStatus.v1ResaleAppliedTimestamp === 0
        &&
        this.$store.state.accountStatus.v1UpgradeAppliedTimestamp === 0
        &&
        this.$store.state.accountStatus.v1Balance.gt(0)
      )
    }
  }
}
</script>
