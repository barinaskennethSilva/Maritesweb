<template>
  <nav class="navbar navbar-expand-lg navbar-light">
  <div class="container-fluid">
    <a class="navbar-brand text-white" href="#">Maritesweb</a>
       <div class="icon ">
   <i @click="toggleMobileNav"  v-show="mobile" :class="{ 'icon-active' :mobileNav }" class="bi bi-justify"></i>
   </div>
  </div>
</nav>
<transition name="mobile-nav">
 <ul v-show="mobileNav" class="dropdown-nav">
   <div class="Topdash">

   </div>
    <div class="navbar-mobile">
       <li class="nav-item ms-3">
   <router-link to="/" class="a-link"><i class="link-icon bi bi-house"></i>Home</router-link> 
</li>
 <li class="nav-item ms-3">
    <router-link to="/about" class="a-link"><i class="link-icon bi bi-bell-fill"></i>About</router-link>
</li>
 <li class="nav-item ms-3">
   <router-link to="/login" class="a-link"><i class="link-icon bi bi-box-arrow-in-right"></i>Login</router-link>
</li>
  </div>

</ul>
 </transition>
 </template>
 <script >
    export default {
      name:"header_pages",
      data(){
        return{
          mobile:true,
          mobileNav: false,
        }
      },
      methods:{
      toggleMobileNav(){
    this.mobileNav = !this.mobileNav
  },
  }
    }
  //npm install vuex --save
   
 </script>