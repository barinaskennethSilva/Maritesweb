import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
var firebaseConfig = {

  apiKey: "AIzaSyCCnyuJC112u98hmvN3SOM8MKNtJXRuPs8",
  authDomain: "portfoliochat-2193c.firebaseapp.com",
  databaseURL: "https://portfoliochat-2193c-default-rtdb.firebaseio.com",
  projectId: "portfoliochat-2193c",
  storageBucket: "portfoliochat-2193c.appspot.com",
  messagingSenderId: "24823005066",
  appId: "1:24823005066:web:21bc49cefe2d5393b95273"
};
firebase.initializeApp(firebaseConfig);

createApp(App).use(router).mount('#app')
////////////////////////////////////////////
<template>
   <img src="./img/front_pages.png" class="back_pages">
  
<header_main/>

 <div class="container-form">

    <!--form class="login-form" @submit.prevent="CreateRoom"-->

  <input class="form-control" type="text" v-model="Room_Name" placeholder="Create Room " /> 
  
  <input class="form-control rounded mt-3 " placeholder="Room Description" v-model="roomDescript">
    
        <div class="mt-3 mb-4 pass_icon">
    <button @click="toggleMobileNav" class="on-icon">
      <i class="bi bi-toggle-off " v-show="hide_pass"></i>
      <i class="bi bi-toggle-on " v-show="show_pass" ></i>
      </button>
    <label for="password" class="fw-bold text-left ms-5">Require Password</label>
     
   </div>
<div class="pass" v-show="my_pass">
  <label>Enter your Password (optional)</label>
     <input type="password" class="form-control rounded" id="password" placeholder="Password" v-model="password" />
</div>

<div class="col-sm-12 text-center form-group mt-2">
      <button v-bind:disabled="xhrRequest" v-bind:class="{disabled: xhrRequest}" class="btn btn-lg btn-primary px-4 w-100"  @click="CreateRoom">
     <span v-if="! xhrRequest">Create Room</span>
          <div v-if="xhrRequest" class="spinner-border  _loader" role="status">
           </div>
       <span v-if="xhrRequest"> Wait...</span>
            </button>
            </div>

  
   </div>
</template>
<style scoped>
.back_pages{
 height: 646px;
 width: 100%;
 position: absolute;
 top: 0px;
 left: 0px;
  z-index: -60;
}
.container-form{
  margin-top: 130px;
  padding: 10px;
}
.on-icon{
  font-size: 30px;
  position:absolute;
  left: 10px;
  margin-top: -10px;
  background-color: transparent;
  outline: none;
  border: none;
  width: 40px;
}
.pass_icon{
  display: flex;
  flex-direction: row;
}
._loader {
    position:relative;
    top:6px;
    left:-20px;
}
</style>
<script>
import header_main from './header_main.vue';
import { db ,addDoc,collection} from '../main.js';

export default {
  name:'Create_Room',
  components:{
header_main,
    },
    data(){
    return{
   Room_Name:'',
      show_pass: false,  
      hide_pass:true,
      my_pass:false,
      xhrRequest: false, 
    }
    },
methods:{
  toggleMobileNav(){
    this.show_pass = !this.show_pass
    this.hide_pass = !this.hide_pass
    this.my_pass = !this.my_pass
  },
  
  
 /* CreateRoom:function(){
    addDoc(collection(db,'Room_Details'),{
      text:this.$refs.Room_Name.value,date:Date.now()
    });
    let v = this;
    v.xhrRequest = true;  
  }*/

async CreateRoom() {
      try {
        // Add user input to Firestore
        await db.collection('Room_Details').add({
          field1: this.Room_Name,
          // You can add more fields as needed
        });
        console.log('Data added to Firestore successfully!');
        this.Room_Name = ''; // Clear the input field after adding data
      } catch (error) {
        console.error('Error adding data to Firestore:', error);
      }
    },


}
}

</script>
