<template>

<header_pages v-if="!$route.meta.hideNavbar"/>
<div class="app">
  <router-view/>
</div>

</template>
<script>
import header_pages from './views/header.vue'
  export default {
    components:{
header_pages,
    },
   

  }
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.icon{
  display:flex;
  position: absolute;
  align-items: center;
  top:0;
  right: 24px;
  height: 100%;
color: #fff;
font-size: 34px;
  i{
    cursor: pointer;
    font-size: 84px;
    transition: 0.8 ease all;
}
}
.dropdown-nav{
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  overflow: hidden;
  max-width: 250px;
  height: 100%;
  background-color: #000;
  border: 1px solid #000;
  top: 0;
  left: 0;
  z-index: 80;
}
.Topdash{
  height: 200px;
  width: 100%;
  position: absolute;
  left: 0px;
 background-image: url('./views/img/back_pages.png');
  background-size: 100% 100%;
}
.navbar-mobile{
  display: flex;
  flex-direction: column;
  position: relative;
  top: 190px;
}
  .nav-item{
    list-style-type:none;
    margin-top: 20px;
    width: 100%;
  }
 .a-link:hover{
    color: red;
  }
    .a-link{
      color: #fff;
    text-decoration: none;
    font-size: 25px;
    }
 .link-icon{
   position: absolute;
   left: 10px;
    }

</style>
