<template>
  <div>
    <img src="./img/msg_pages.png" class="back_pages">
    <header_main/>
    <div class="container-field">

   <router-link class="nav-link" v-for="roomDetail in Room_Details" :key="roomDetail.id" to="#" @click="room_Pass">
   <!--:to="{ name: 'Chat_user', params: { roomName: roomDetail.Room_Name } }" -->
     
        <div class="wrapper">
          <div class="online-dash"></div>
          <img src="./img/back_pages.png" class="pic_chat">  
          <div class="text-wrapper">
    <label >{{ roomDetail.Room_Name }}</label>
    <span class="ms-4" >{{ roomDetail.Room_Description }}</span>
          </div>
        </div>
      </router-link>
      
    </div>
  <!--- maintenance password -----> 
   <div class="Pass_room" v-if="Pass_room" for="roomDetail in Room_Details" :key="roomDetail.id">
 <div class="topPass bg-dark d-flex flex-column text-center">
<i class="bi bi-person-check" style="color:#fff;font-size:28px"></i>
    <label class="text-white">{{ roomDetail.Room_Name }}</label> 
    <i class="bi bi-x"></i>
 </div>
 <div class="p-3">
   
  <label for="room_pass" class="mb-2">Join Room Chat</label> 
     <input type="password" class="form-control mb-2 " id="room_pass" placeholder="Password">
     <p class="text-danger">Incorrect password!</p>
     <input type="submit" name="confirm" id="confirm" value="Join" class="btn btn-primary mb-2 w-100"/>
     </div>
   </div> 
      <!--- maintenance password -----> 
    
  </div>
</template>

<script>
import header_main from './header_main.vue'
import { db } from '../main.js';
import { query, collection, getDocs } from 'firebase/firestore';

export default {
  name: 'main_form',
  created() {
    this.displayData();
  },
  components: {
    header_main,
  },
  data() {
    return {
      Room_Details: [],
      Room_Name: "",
      Pass_room:false;
    };
  },
  methods: {
    async displayData() {
      const querySnap = await getDocs(query(collection(db, 'Room_Details')));
      this.Room_Details = querySnap.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        };
      });
    },
    /*room_Pass(){
      
    },*/
  }
}
</script>
<style>
.back_pages{
 height: 646px;
 width: 100%;
 position: absolute;
 top: 0px;
 left: 0px;
  z-index: -60;
}
.container-field::-webkit-scrollbar{
  display: none;
}
.container-field{
  overflow-y: auto;
  overflow-x: hidden;
  height: 435px;
  position: relative;
  top: 155px;

}
  .wrapper{
    width: 100%;
    height: 80px;
    padding: 5px;
    display: flex;
    flex-direction: row;
  }
    .wrapper:hover{
      cursor: pointer;
    }
  .online-dash{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: green;
    position: relative;
    top: 15px;
    left: 10px;
    margin-right:20px ;
  }
     .pic_chat{
      height: 50px;
      width: 50px;
      border-radius: 50%;
      margin-right: 10px;
  }
  .text-wrapper{
    display: flex;
    flex-direction: column;
    color: #fff;
    text-align: center;
  }
  .Pass_room{
    position: absolute;
    background-color: #fff;
    border-radius: 10px;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 60%;
  }
  .topPass{
   border-top-left-radius: 10px; 
   border-top-right-radius: 10px;
   padding: 10px;
   margin-bottom: 3px;
  }
  .Pass_room .bi-x{
    font-size: 20px;
    color:#fff;
    position: absolute;
    right: 10px;
  }
</style>