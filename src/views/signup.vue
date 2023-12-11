<template >
    <img src="./img/back_pages.png" class="back_pages">
  <div class="container">
  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 form">
    <div class="col">   <form class="login_form" @submit.prevent="signupRequest" id="signup-form">
<div class="mt-2">
   <input type="email" class="form-control form-control-lg" placeholder="Enter your email" v-model="email" /> 
</div>   
<div class="mt-2">
    <input type="password" class="form-control form-control-lg" placeholder="Enter your password" v-model="password"/>
</div>

<div class="mt-2">
    <input type="text" class="form-control form-control-lg" placeholder="Enter your Name" v-model="name"/>
</div>
<div class="col-sm-12 text-center form-group mt-2">
        <button v-bind:disabled="xhrRequest" v-bind:class="{disabled: xhrRequest}" class="btn btn-lg btn-primary px-4 w-100">
            <span v-if="! xhrRequest">Sign Up</span>
   <div v-if="xhrRequest" class="spinner-border _loader" role="status">
    </div>   
    <span v-if="xhrRequest"> Wait...</span>
        </button>
      
         </div>
   </form>


</div>
    <div class="col mt-3">    
    
   <div class="alert-container">
   <div v-if="errorMessage !== ''" class="alert text-danger" role="alert" >
                {{ errorMessage }}

  </div>
  <div v-if="successMessage !== ''" class="alert text-success" role="alert">
                {{ successMessage }}
          
  </div>
</div>   
</div>
    <div class="col mt-4"> 
    <p class="link-form">Don't have an account? <router-link to="/login" class="link-a" >Login</router-link></p>
    </div>
  </div>
</div>
     
</template>
<script>
import { updateProfile } from 'firebase/auth';
import firebase from 'firebase/compat/app';
 import { auth } from  '../main.js';
  export default {
    name: "Signup_form",
    data(){
      return{
        xhrRequest: false,
        email:'',
        password:'',
        name:'',
      }
    },
    methods: {
  
signupRequest() {
  let v = this;
  v.xhrRequest = true;
  v.errorMessage = "";
  v.successMessage = "";
  
  if (v.email == "" || v.password == "" || v.name == "") {
    v.errorMessage = "All Fields Are Required to Fill";
    v.xhrRequest = false;
  } else {
    firebase.auth().createUserWithEmailAndPassword(v.email, v.password, auth)
      .then(() => {
        v.successMessage = "Registered Successfully.";
        v.xhrRequest = false;
        
  // for username
  updateProfile(auth.currentUser, {
    displayName:this.name
  }).then(()=>{
    console.log(auth.currentUser.displayName)
  })
 ///////////////////////////// 
      })
      .catch(error => {
        v.errorMessage = error.message; // Access the error message directly
        v.xhrRequest = false;
      });
  }
}
  
  
  
    }
    }
    //pkg install libhdf5
</script>
<style scoped>
._loader {
    position:relative;
    top:6px;
    left:-20px;
}
 .alert-container{
  height: 50px;
   width: 98%;
   position: relative;
   left: 2px;
 }
.form{
 z-index: 60;
  margin: 10px auto;
  position: relative;
  top: 195px;
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
.alert{
  position: absolute;
  width: 100%;
}
</style>