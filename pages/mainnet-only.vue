<template>
  <div>
    <div class="py-20 px-6 bg-gradient-to-br from-green-500 to-indigo-600 text-center">
      <h2 class="text-4xl font-extrabold text-white">
        For Ethereum main-net only
      </h2>

      <p class="mt-4 text-lg leading-8 text-indigo-200">
        Please scan the QR-Code with your imToken APP
        or switch to the Ethereum main-net.
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
    </div>
  </div>
</template>

<script>
import VueQr from 'vue-qr'

export default {
  name: 'no-web3',
  components: { VueQr },
  middleware: ['connect'],
  data() {
    return {
      locationHref: location.href
    }
  }
}
</script>
