<template>
<section class="hero">
    <nav class="navbar is-fixed-top" style="background:#183e52;">
        <div class="level" style="margin-left:70px;">
            <div class="navbar-brand "></div>
            <div class="level-left">
                <div class="level-item">
                 <router-link to="/" >
                    <img src="https://www.letstango.com/skin/frontend/default/ltdefault/images/lets-tango-logo.png" width="170" height="40" alt="">   
                </router-link>
                </div>
                <div class="level-item">
                <div class="field has-addons">
                    <p class="control is-paddingless">
                    <input class="input " type="text" placeholder="Find a post" style="border-radius: 0;margin-left:100px;width:700px;">
                    </p>
                     <button  class="button is-info" style="border-radius: 0;background:#f57d31;" width="100%" heigh="38px">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
                
                </div>
            </div>
            <div class="level-right" style="margin-left:100px;">
                 <div class="level-item">
                    <nuxt-link :to="{name: 'cart'}">
                    <button type="button" class="button is-primary">
                        <i class="fas fa-shopping-cart"></i>
                        Cart  <span class="is-white">0</span>
                    </button></nuxt-link>
                 </div>
            </div>

        </div>
    </nav>
</section>
</template>

<script>
export default {
    computed: {
      cartTotal () {
        return this.$store.state.cartTotal
      }
    }
}
</script>


<style scoped>
    @import 'https://use.fontawesome.com/releases/v5.1.0/css/all.css';
</style>
