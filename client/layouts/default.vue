<template>
  <div>
    <HeaderBody/>
    <!-- <Headerextend/> -->
    <nuxt/>
    <nuxt/>
    <nuxt/>
  </div>
</template>

<script>
import HeaderBody from '@/components/Header/HeaderBody.vue';
// import Headerextend from '@/components/Headerextend.vue';
export default {
    components:{
      HeaderBody,
      // Headerextend
    }
}
</script>


<style>
html
{
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

</style>
