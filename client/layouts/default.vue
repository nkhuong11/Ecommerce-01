<template>
  <div>
    <HeaderTop/>
    <nuxt/>
  </div>
</template>

<script>
import HeaderTop from '@/components/Header/HeaderTop.vue';

export default {
  components: {
    HeaderTop,

  }
}

</script>



<style>
html
{
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0px;
  padding: 0px;
}

</style>
