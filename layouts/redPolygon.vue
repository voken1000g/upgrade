<template>
  <div class='bg-gradient-to-br from-white to-red-100'>
    <div class='bg-polygon min-h-screen w-full flex items-center justify-center'>
      <Nuxt/>
    </div>
  </div>
</template>

<style scoped>
.bg-polygon {
  background: url("../assets/bg/polygon.svg") no-repeat;
  @apply bg-cover;
}
</style>
