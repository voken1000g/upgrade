<template>
  <div class="pb-12">
    <div class="px-4">
      <h1 class="font-light text-3xl text-gray-700 text-center tracking-tight">
        Voken {{ $t('Resale_or_Update_Program') }}
      </h1>

      <div class="mt-4 font-mono text-gray-500 text-center">
        {{ $store.state.upgradeContractAdds }}
      </div>

      <not-for-the-address v-if="$store.state.notForTheAddress"/>
    </div>

    <div v-if="$store.state.account">
      <deadline-countdown v-if="showV1Portal || showV2Portal"/>

      <!--  v1  -->
      <div v-if="$store.state.accountStatus.v1ResaleAppliedTimestamp > 0">
        <v1-resale-status />
      </div>

      <div v-if="$store.state.accountStatus.v1UpgradeAppliedTimestamp > 0">
        <v1-upgrade-status />
      </div>

      <div v-if="showV1Portal">
        <nuxt-link :to="localePath('/v1')" class="portal-card bg-gradient-to-br from-gray-600 to-gray-700">
          {{ $t('Portal') }} for Voken1.0
        </nuxt-link>
      </div>

      <!--  v2  -->
      <div v-if="$store.state.accountStatus.v2ResaleAppliedTimestamp > 0">
        <v2-resale-status />
      </div>

      <div v-if="$store.state.accountStatus.v2UpgradeAppliedTimestamp > 0">
        <v2-upgrade-status />
      </div>

      <div v-if="showV2Portal">
        <nuxt-link :to="localePath('/v2')" class="portal-card bg-gradient-to-br from-indigo-600 to-indigo-700">
          {{ $t('Portal') }} for Voken2.0
        </nuxt-link>
      </div>

      <div v-if="showV1Portal || showV2Portal" class="mt-6 font-mono text-sm text-center">
        <a target="_blank" :href="$t('learn_upgrade.href')" class="a-info">
          <fa :icon="['fas', 'info-circle']" /> {{ $t('learn_upgrade.text') }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import fn from '../utils/functions'
import V1ResaleStatus from '~/components/V1ResaleStatus'
import V1UpgradeStatus from '~/components/V1UpgradeStatus'
import V2ResaleStatus from '~/components/V2ResaleStatus'
import V2UpgradeStatus from '~/components/V2UpgradeStatus'
import DeadlineCountdown from '@/components/DeadlineCountdown'
import NotForTheAddress from '@/components/NotForTheAddress'

export default {
  name: 'index',
  layout: 'dapp',
  components: { NotForTheAddress, DeadlineCountdown, V2UpgradeStatus, V2ResaleStatus, V1UpgradeStatus, V1ResaleStatus },
  mounted: async function() {
    await this.$store.state.dApp.getV1ResaleStatus()
    await this.$store.state.dApp.getV1UpgradeStatus()
    await this.$store.state.dApp.getV2ResaleStatus()
    await this.$store.state.dApp.getV2UpgradeStatus()
  },
  computed: {
    showV1Portal() {
      return (
        this.$store.state.accountStatus.v1ResaleAppliedTimestamp === 0
        &&
        this.$store.state.accountStatus.v1UpgradeAppliedTimestamp === 0
        &&
        this.$store.state.accountStatus.v1Balance.gt(0)
      )
    },
    showV2Portal() {
      return (
        this.$store.state.accountStatus.v2ResaleAppliedTimestamp === 0
        &&
        this.$store.state.accountStatus.v2UpgradeAppliedTimestamp === 0
        &&
        this.$store.state.accountStatus.v2Balance.gt(0)
      )
    },
    v1Balance() {
      return fn.amountDisplay(this.$store.state.accountStatus.v1Balance, 6)
    },
    v2Balance() {
      return fn.amountDisplay(this.$store.state.accountStatus.v2Balance, 6)
    }
  }
}
</script>

<style scoped>
.portal-card {
  @apply mt-8 mx-4 flex justify-center items-center;
  @apply py-12 px-6 border border-transparent rounded-md;
  @apply leading-6 font-bold text-2xl text-indigo-50;
  @qpply transition duration-150 ease-in-out;
}


.portal-card:hover {
  @apply bg-gradient-to-br from-indigo-500 to-indigo-600 text-white;
}

.portal-card:focus {
  @apply outline-none border-indigo-600;
}

.portal-card:active {
  @apply bg-indigo-600;
}

.a-info {
  @apply pb-2 px-2 text-blue-500;
}

.a-info:hover {
  @apply border-b border-blue-600 text-blue-600;
}
</style>
