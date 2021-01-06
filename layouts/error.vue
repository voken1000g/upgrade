<template>
  <div class='text-red-800 text-center'>
    <div class='text-6xl'>
      <fa :icon="['fas', 'bug']" />
    </div>

    <h1 class='mt-10 font-mono font-bold text-4xl'>
      Error
      {{ error.statusCode }}
    </h1>

    <h2 class='mt-6 text-2xl'>
      {{ error.message }}
    </h2>
  </div>
</template>

<script>
export default {
  name: 'error',
  layout: 'redPolygon',
  props: ['error']
}
</script>

