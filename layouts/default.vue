<template>
  <div @click='hideNavMenu'>
    <SiteNav/>
    <Nuxt class="mx-auto pt-12 max-w-lg"/>
  </div>
</template>

<script>
import SiteNav from '../components/SiteNav'

export default {
  components: { SiteNav },
  methods: {
    hideNavMenu() {
      this.$store.dispatch('nav/HIDE_ALL')
    }
  }
}

</script>

<style scoped>

</style>
