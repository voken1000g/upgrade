<template>
  <div>
    <div class="py-20 px-6 bg-gradient-to-br from-green-500 to-indigo-600 text-center">
      <h2 class="text-4xl font-extrabold text-white">
        Connect to wallet
      </h2>

      <p class="mt-4 text-lg leading-8 text-indigo-200">
        Please scan the QR-Code with your imToken APP
        or connect to MetaMask wallet.
      </p>

      <div class="mt-14 flex items-center justify-center">
        <div class="w-1/2">
          <vue-qr class="border-teal-300 border"
                  :text="locationHref"
                  :size=640
                  :margin=32
                  colorDark="#2F855A" />
        </div>
      </div>

      <button v-if="!$store.state.web3Ready" @click="getMetaMask">
        Get MetaMask
      </button>

      <button v-if="$store.state.web3Ready && !$store.state.account" @click="connectToWallet">
        Connect to wallet
      </button>

      <nuxt-link v-if="$store.state.account" :to="localePath('/')">
        Back to Home-Page
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import VueQr from 'vue-qr'
import MetaMaskOnboarding from '@metamask/onboarding';

export default {
  name: 'no-web3',
  components: { VueQr },
  middleware: ['connect'],
  data() {
    return {
      locationHref: location.href
    }
  },
  methods: {
    async getMetaMask() {
      const onBoarding = new MetaMaskOnboarding();
      onBoarding.startOnboarding();
    },
    async connectToWallet() {
      await this.$store.dispatch('CONNECT_WEB3')
    }
  }
}
</script>


<style scoped>
button, a {
  @apply mt-14 w-auto inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white;
}

button:hover, a:hover {
  @apply bg-indigo-50;
}
</style>
