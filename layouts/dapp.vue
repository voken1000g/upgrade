<template>
  <div>
    <SiteNav/>
    <Nuxt class="mx-auto pt-12 max-w-lg"/>
  </div>
</template>

<script>
import SiteNav from '../components/SiteNav'

export default {
  middleware: ['dapp'],
  components: { SiteNav }
}

</script>

<style scoped>

</style>
