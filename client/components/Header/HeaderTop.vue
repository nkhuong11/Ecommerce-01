<template>
    <div id="header-top">
        <div class="main">
            <ul id="top-primary-menu">
                <li>LANG</li>
            </ul>

            <ul id="top-secondary-menu">
                <li><nuxt-link to="/about">SELL</nuxt-link></li>
                <li><nuxt-link to="/about">MY ACCOUNT</nuxt-link></li>
                <li><nuxt-link to="/about">TRACK ORDER</nuxt-link></li>
                <li><nuxt-link to="/login">LOGIN</nuxt-link></li>
            </ul>
        </div>
    </div>
</template>


<script>
export default {
  name: "HeaderTop",
  
};
</script>

<style scoped>
ul {
  list-style-type: none;
}

a:-webkit-any-link {
    color: #fff;
    cursor: pointer;
    text-decoration: none;
}

li {
    padding-left: 30px;
    color: #fff;
    font-size: 15px;
}

.main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
}

#header-top {
    background: #000;
}

#top-primary-menu {
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-around;
    padding: 0px 0px 0px;
    margin: 3px;
    
}

#top-secondary-menu {
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-around;
    padding: 0px 15px 0px;
    margin: 3px;
}


</style>
