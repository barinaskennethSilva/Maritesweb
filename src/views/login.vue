<template>
  <img src="./img/back_pages.png" class="back_pages">
 <div class="form-container p-2">
   <form class="login_form" @submit.prevent="loginRequest">
<div class="mt-2">
   <input type="email" class="form-control form-control-lg" placeholder="Enter your email" v-model="email" />  
</div>
 
<div class="mt-2">
    <input type="password" class="form-control form-control-lg" placeholder="Enter your password" v-model="password"/>
</div>


<div class="col-sm-12 text-center form-group mt-2">
      <button v-bind:disabled="xhrRequest" v-bind:class="{disabled: xhrRequest}" class="btn btn-lg btn-primary px-4 w-100">
     <span v-if="! xhrRequest">Login</span>
          <div v-if="xhrRequest" class="spinner-border  _loader" role="status">
           </div>
       <span v-if="xhrRequest"> Wait...</span>
            </button>
            </div>
 <div class="alert-container">
   <div v-if="errorMessage !== ''" class="alert text-danger" role="alert" >
                {{ errorMessage }}
 </div>
  <div v-if="successMessage !== ''" class="alert text-success" role="alert">
                {{ successMessage }}
          
  </div>
</div>   


<div class="col-sm-12 text-center form-group mt-5">
    <p class="link-form">Don't have an account? <router-link to="/signup" class="link-a" >Sign Up</router-link>

    </p>
                    </div>
   </form>
 </div> 
</template>
<script>
import firebase from 'firebase/compat/app';
  export default {
    name: "Login_form",
    data(){
    return{
      email:'',
      password:'',
     xhrRequest: false, 
     errorMessage: "",
     successMessage: "",
     userEmail: null,
    }
    
    },
    methods:{
    loginRequest() {
      let v = this;
    v.xhrRequest = true;  
    v.errorMessage = "";
     v.successMessage = "";
  
    if(v.email == "" || v.password == ""){
     v.errorMessage = "All Field Required to Fill"; 
     v.xhrRequest = false;
    }
    else{
   firebase.auth().signInWithEmailAndPassword(v.email, v.password).then(
      ()=>{
        this.$router.replace('main_form');
            v.xhrRequest = false;
         v.showNavbar = false;
         
      },
      (err)=>{
  v.xhrRequest = false;  
     v.errorMessage =`${err.message}`;   
      }
      );
    }
    },
  }
  }
</script>
<style scoped>
._loader {
    position:relative;
    top:6px;
    left:-20px;
}
.form-container{
 z-index: 60;
  margin: 10px auto;
  position: relative;
  top: 185px;
}
.back_pages{
 height: 646px;
 width: 100%;
 position: absolute;
 top: 0px;
 left: 0px;
  z-index: -60;
}
.link-form{
  font-size: 18px;
}
.link-a{
  text-decoration: none;
}
</style>