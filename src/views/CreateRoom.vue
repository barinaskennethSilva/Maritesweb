<template>
  <div>
    <!-- Input field for entering a message -->
 <img src="./img/front_pages.png" class="back_pages">
    <header_main/>
  <div class="shadow p-3 myform">
    <input v-model="Room_Name" placeholder="Room Name" class="form-control"/>
    <textarea class="form-control mt-3"  placeholder="Room Description" v-model="Room_Descript"></textarea>
    <div class="mypass mt-3">
       <input type="password" v-model="password" placeholder="Password" class="form-control"/>
    </div>

  <div v-if="successMessage !== ''" class="alert text-success" role="alert">
                {{ successMessage }}
  </div>

    
    <div class="col-sm-12 text-center form-group mt-2">
      <button v-bind:disabled="xhrRequest" v-bind:class="{disabled: xhrRequest}" class="btn btn-lg btn-primary px-4 w-100"  @click="Create_Room">
     <span v-if="! xhrRequest">Create New Room</span>
          <div v-if="xhrRequest" class="spinner-border  _loader" role="status">
           </div>
       <span v-if="xhrRequest"> Wait...</span>
            </button>
            </div>
    
    
    </div>
 
  </div>
</template>

<script>
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { ref, reactive, watchEffect } from 'vue'; // Import Vue Composition API
import {db} from '../main.js';
import header_main from './header_main.vue'

export default {
  name:'main_form', 
    components:{
header_main,
    },
  data() {
    return {
      xhrRequest: false, 
      Room_Name: "",
      Room_Descript: "",
      password:"",
      Room_Details: [],
      successMessage: "",
    };
  },
  methods: {
    async Create_Room() {
  this.successMessage = "";
    this.xhrRequest = true;  
      try {
        const docRef = await addDoc(collection(db, 'Room_Details'), {
          Room_Name: this.Room_Name,
          Room_Description: this.Room_Descript,
          Password: this.password,
          date: Date.now()
        });
       this.xhrRequest = false;  
        this.successMessage = 'Creating Room done ! ', docRef.id;
        this.Room_Name = ''; // Clear the input field after adding
      } catch (error) {
        console.error('Error adding Room_Details: ', error);
        // You can display an error message to the user or handle it in another way.
      }
    },

    fetchRoom() {
      const Room_DetailsCollection = collection(db, 'Room_Details');

      onSnapshot(Room_DetailsCollection, (querySnapshot) => {
        this.Room_Details = []; // Clear the existing messages array
        querySnapshot.forEach((doc) => {
          this.Room_Details.push({
            id: doc.id,
            text: doc.data().text,
            date: doc.data().date,
          });
        });
      }, (error) => {
        console.error('Error fetching Room_Details: ', error);
        // Handle the error, e.g., display an error message.
      });
    },
  },
  mounted() {
    // Fetch messages when the component is mounted
    this.fetchRoom();
  },
};
</script>
<style>
.myform{
  margin-top: 160px;
}
.back_pages{
 height: 646px;
 width: 100%;
 position: absolute;
 top: 0px;
 left: 0px;
  z-index: -60;
}
</style>