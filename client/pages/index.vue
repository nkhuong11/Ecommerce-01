<template>
  <div class="home-page">
    <section class="intro">
      <h1>Get the latest tech news!</h1>
    </section>
    <section class="featured-posts">

      <nuxt-link :to="'/posts/' + 1">
          <article class="post-preview">
            <div class="post-thumbnail"></div>
            <div class="post-content">
              <h1>Post title</h1>
              <p>Preview Text</p>
            </div>
          </article>
      </nuxt-link>

      <nuxt-link :to="'/posts/' + 2">
          <article class="post-preview">
            <div class="post-thumbnail"></div>
            <div class="post-content">
              <h1>Post title 2</h1>
              <p>Preview Text 2</p>
            </div>
          </article>
      </nuxt-link>

    </section>
  </div>

</template>

<style scoped>

</style>
