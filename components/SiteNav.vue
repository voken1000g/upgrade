<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <!-- Mobile menu button -->
          <div class="-ml-2 mr-2 flex items-center md:hidden">
            <button
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
              aria-label="Main menu"
              aria-expanded="false"
              @click.stop="toggleMobileMenu"
            >
              <!-- Icon when menu is closed. -->
              <svg v-show="!$store.state.nav.menuMobile" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <!-- Icon when menu is open. -->
              <svg v-show="$store.state.nav.menuMobile" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Logo -->
          <nuxt-link :to="localePath('/')" class="flex-shrink-0 flex items-center">
            <div class="text-gray-300 text-3xl">
              <fa :icon="['fas', 'wallet']" />
            </div>
            <div class="hidden lg:block pl-4 text-gray-300 text-2xl">
              {{ $t('Resale_or_Update') }}
            </div>
          </nuxt-link>
        </div>

        <div class="flex items-center">
          <div v-if="$store.state.account"
               class="flex-1 flex items-center justify-center"
          >
            <div :class="{'address-mainnet': $store.state.isMainNet, 'address-testnet': !$store.state.isMainNet}"
            >
              {{ fn.simplifyAddress($store.state.account) }}
            </div>
            <div v-if="!$store.state.isMainNet"
                 class="testnet-name"
            >
              {{ fn.chainNameFromId($store.state.chainId) }}
            </div>
          </div>

          <!-- Profile  -->
          <div class="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
            <div class="relative">
              <!-- Profile button -->
              <div>
                <button
                  class="flex text-2xl text-gray-300 focus:outline-none focus:text-white transition duration-150 ease-in-out"
                  id="user-menu"
                  aria-label="User menu"
                  aria-haspopup="true"
                  @click.stop="toggleLangMenu"
                >
                  <fa :icon="['fas', 'globe-americas']" />
                </button>
              </div>

              <!-- Language panel -->
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div v-show="$store.state.nav.languageMenu"
                     class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50">
                  <div class="py-1 rounded-md bg-white shadow-xs"
                       role="menu"
                       aria-orientation="vertical"
                       aria-labelledby="user-menu"
                  >
                    <nuxt-link v-for="lang in languages"
                               :key="lang.name"
                               v-if="$i18n.locale !== lang.name"
                               class="profile-h"
                               :to="switchLocalePath(lang.name)">
                      {{ lang.title }}
                    </nuxt-link>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div class="md:hidden"
         :class="{ block: $store.state.nav.menuMobile, hidden: !$store.state.nav.menuMobile }">
      <div class="pt-2 pb-3">
        <div class="px-2 sm:px-3">
          <nuxt-link v-for="lang in languages"
                     :key="lang.name"
                     v-if="$i18n.locale !== lang.name"
                     class="profile-v"
                     :to="switchLocalePath(lang.name)">
            {{ lang.title }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import fn from '../utils/functions'

export default {
  name: 'SiteNav',
  data() {
    return {
      fn: fn,
      languages: [
        {
          'name': 'en',
          'title': 'English'
        },
        {
          'name': 'zh',
          'title': '简体中文'
        }
      ],

      mobileMenu: false,
      langMenu: false
    }
  },
  computed: {
    version() {
      return this.$store.state.version
    }
  },
  methods: {
    toggleLangMenu() {
      this.$store.dispatch('nav/TOGGLE_LANGUAGE_MENU')
    },
    toggleMobileMenu() {
      this.$store.dispatch('nav/TOGGLE_MENU_MOBILE')
    }
  }

}
</script>

<style scoped>
.nav-h {
  @apply ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300;
  @apply transition duration-150 ease-in-out;
}

.nav-h:first-child {
  @apply ml-0;
}

.nav-h:hover {
  @apply text-white bg-gray-700;
}

.nav-h:focus {
  @apply outline-none text-white bg-gray-700;
}

.nav-h.nuxt-link-exact-active {
  @apply bg-gray-900;
}

.nav-v {
  @apply mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300;
  @apply transition duration-150 ease-in-out;
}

.nav-v:first-child {
  @apply mt-0;
}

.nav-v:hover {
  @apply text-white bg-gray-700;
}

.nav-v:focus {
  @apply outline-none text-white bg-gray-700;
}

.nav-v.nuxt-link-exact-active {
  @apply bg-gray-900;
}

.address-mainnet {
  @apply py-2 px-4 bg-gray-700 rounded-md font-mono text-sm text-gray-300;
}

.address-testnet {
  @apply py-2 px-4 bg-gray-700 rounded-l-md font-mono text-sm text-gray-300;
}

.testnet-name {
  @apply py-2 px-4 bg-orange-500 rounded-r-md font-mono text-sm text-gray-50;
}

.profile-h {
  @apply block px-4 py-2 text-sm leading-5 text-gray-700;
  @apply transition duration-150 ease-in-out;
}

.profile-h:hover {
  @apply bg-gray-100;
}

.profile-h:focus {
  @apply outline-none bg-gray-100;
}

.profile-v {
  @apply mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400;
  @apply transition duration-150 ease-in-out;
}

.profile-v:first-child {
  @apply mt-0;
}

.profile-v:hover {
  @apply text-white bg-gray-700;
}

.profile-v:focus {
  @apply outline-none text-white bg-gray-700;
}

</style>
