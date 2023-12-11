<template>
  <nav class="navbar navbar-expand-lg navbar-light">
  <div class="container-fluid">
    <a class="navbar-brand text-white" href="#" v-if="user">{{ displayName }}</a>
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
   <router-link to="/Create_Room" class="a-link"><i class="link-icon bi bi-house"></i>Create Room</router-link> 
</li>
 <li class="nav-item ms-3">
    <router-link to="/main_form" class="a-link"><i class="link-icon bi bi-bell-fill"></i>Chat Room</router-link>
</li>
 <li class="nav-item ms-3">
   <router-link to="/login" class="a-link"><i class="link-icon bi bi-box-arrow-in-right"></i>Logout</router-link>
</li>
  </div>

</ul>
 </transition>
 </template>
 <script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { auth } from '../main.js';
//import { signOut } from 'firebase/auth';
  export default {
      name:"header_main",
      data(){
        return{
          mobile:true,
          mobileNav: false,
          user: null,
          displayName:''
        }
      },
      beforeUpdate(){
    if (auth.currentUser) {
      this.displayName = auth.currentUser.displayName
    }    
      },
      mounted() {
    // Listen for changes in authentication state
    firebase.auth().onAuthStateChanged(user => {
      this.user = user; // Update the user data
    });
  },
      methods:{
      toggleMobileNav(){
    this.mobileNav = !this.mobileNav
  },
  }
    }
  //npm install vuex --save
   
 </script>