<template>
   <img src="./img/msg_background.png" alt="pic" class="back_pages">
     <nav class="navbar navbar-expand-lg bg-dark">
  <div class="container-fluid">
 <router-link to="/main_form"  class="navbar-brand ms-3 fw-bold h2 text-white"  > <i class="bi bi-arrow-left me-3 "></i>{{ roomName }}</router-link>
           
  </div>
</nav>
  <div class="text-container">  
 <!----------- under maintenance---------->
  <!------------- for image -------------->
     <div v-for="message in messages" :key="message.id">
  <div class="sender">
    <div class="d-flex flex-column">
      <div class="output-send d-flex flex-column">
        <label for="myname" class="ms-3">{{ message.user }}</label>
        
 <!-- Conditional rendering for text or image -->
     
        <template v-if="message.text">
          <p>{{ message.text }}</p>
        </template>
   <template v-else v-for="(image, index) in imageUrls" :key="index">

    <img  :src="message.imageUrl" alt="User's Image" class="chat-image" />
        </template>
        
 <!----------- Under Maintenance --------->
      </div>
      <p class="ms-3 text-white">{{ formattedDate }}</p>
    </div>
  </div>
   </div>
 <!----------- under maintenance---------->
</div>
  <div class="input-container">
 <div class="text-input">
    <input type="text"
v-model="text"
class="myinput"
placeholder="Type your message..." />
 <button class="btn-send" v-on:click="sendMessage"><i class="bi bi-send"></i></button>     
      </div>
    <label for="img" id="file" @click="toggleImg"> <i class="bi bi-camera"></i></label>
     <input ref="fileInput" id="img" type="file" accept="image/*"  @input="pickFile"/> 
       </div>
         <!---- image viewer @change="pickFile"--->
  <div class="imagePreviewWrapper" v-if="imagePreviewWrapper">
  
    <div class="imgView" :style="{ 'background-image': `url(${previewImage})` }" @click="selectImage"> </div>
 
 <img :src="imageUrl" alt="Uploaded Image" v-if="imageUrl" />
 
    
 <div class="d-flex">
   
     <button class="btn btn-danger fw-bold ms-2 w-50" @click="CloseImg">Cancel</button>
    <button class="btn btn-primary w-50 fw-bold ms-2 me-2" type="submit" @click="SendPic">Send</button>
  </div>
        </div>   
</template>
<style scoped >
#img{
 display: none; 
}
.text-input-msg{
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 70px;
  padding: 10px;
  box-sizing: border-box;
 display: flex;
  flex-direction: row;
}
#file{
  color: #fff;
  margin-left: 20px;
  font-size: 35px;
}
  .imgView{
    height: 320px;
    width: 90%;
    border: dashed;
    margin:10px auto;
    display: block;
    background-size: 100% 100% !important;
  }
    .imagePreviewWrapper{
    position: absolute;
    bottom: 0px;
    left: 0px;
    background-color: #fff;
    width: 100%;
    height: 400px;
    
  }
  
.back_pages{
 height: 646px;
 width: 100%;
 position: absolute;
 top: 0px;
 left: 0px;
  z-index: -60;
background: linear-gradient(to bottom, #222222, #444444),
}
.text-container:-webkit-scrollbar{
 display: none;
}
.text-container{
  width: 100%;
  height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
}
.input-container{
  width: 100%;
  background-color: #111;
  padding: 10px;
  height: 70px;
  position: absolute;
  bottom: 0px;
  display: flex;
  flex-direction: row;
}
.text-input{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 80%;
  background-color: #fff;
  border-radius: 20px;
  height: 50px;
  padding: 5px;
}
.myinput{
  webkit-border-bottom-left-radius: 10px;
  webkit-border-top-left-radius: 10px;
border-top-left-radius: 10px;
border-bottom-left-radius: 10px;
outline: none;
border: none;
}
.btn-send{
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 28px;
  color: dodgerblue;
}
.sender{
  display: flex;
  flex-direction: column;
  color: #fff;
text-align: left;
  width: 70%;
  margin: 10px 10px;
}
.output-send{
  background-color: #111;
  padding: 10px;
  border-radius: 20px;
}
</style>
<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { auth } from '../main.js';
import io from "socket.io-client";
import { reactive } from 'vue';
import moment from 'moment';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import {db} from '../main.js';
import 'firebase/storage'
import { getStorage,  uploadBytes,ref } from 'firebase/storage';
import { app } from '../main.js';
import { getDownloadURL, listAll } from 'firebase/storage';  

export default {
  name:'Contact_pages',
  computed: {
    roomName() {
      return this.$route.params.roomName;
    }
  },
 data() {
    return {
    //  user: null,
    previewImage: null,
imagePreviewWrapper: false,
      text: "",
      messages: [],
      socketInstance:null,
     displayName:'',
      currentUser: "",
      fileInput: "",
      formattedDate: '',
      msg_inputText:'',
      selectedImage: null,
      imageUrl: null,
     // imageUrls: [],
    };
  },
        beforeUpdate(){
    if (auth.currentUser) {
      this.displayName = auth.currentUser.displayName
    }    
      },
      mounted() {
    firebase.auth().onAuthStateChanged(user => {
     this.user = user;
    // this.getImageUrl();
    });
   // this.retrieveAndDisplayImage();
  },
  created() {
    this.connectToSocket();
  const currentDate = moment();
    this.formattedDate = moment().format('YYYY-MM-DD HH:mm:ss');

  },
  methods: {

pickFile(event) {
    let input = this.$refs.fileInput;
    let file = input.files;

    if (file && file[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
       this.previewImage = e.target.result;
      };
      reader.readAsDataURL(file[0]);
      this.selectedImage = file[0];
    }
  },
        
        toggleImg(){
      this.imagePreviewWrapper = !this.imagePreviewWrapper
    },
    CloseImg(){
      this.imagePreviewWrapper = !this.imagePreviewWrapper
      this.previewImage = ""
    },

 //For image send

SendPic() {
  this.addMessage();

  if (this.selectedImage) {
    const storage = getStorage(app);
    const storageRef = ref(storage, 'msg_pic/' + this.selectedImage.name);

    const file = this.selectedImage;

    // Upload the image
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('File uploaded successfully!');

      getDownloadURL(storageRef).then((url) => {
        this.selectedImageUrl = url;
      }).catch((error) => {
        console.error('Error getting download URL:', error);
      });
    }).catch((error) => {
      console.error('Error uploading file: ', error);
    });
  } else {
    console.error('No file selected for upload.');
  }
},
 ////////// Under Maintenance /////////////       
    connectToSocket() {
      this.socketInstance = io("http://localhost:3000");
      this.socketInstance.on(
        "message:received", (data) => {
          this.messages = this.messages.concat(data);
        }
      )
      
  /////////////////////////////////////    
    },
 
  async  sendMessage(e) {
          this.addMessage();
       /* save data in firestore*/   
      try {
        const docRef = await addDoc(collection(db, 'messages'),{
msgUser:this.displayName,          
msgText:this.text,
msgDate:this.formattedDate
        });
        
      }
      
      catch (error) {
        console.error('Error adding Room_Details: ', error);
      }
      
      this.text = "";
      this.fileInput = "";
        
    },
   addMessage() {
      const message = {
        id: new Date().getTime(),
        text: this.text,
        fileInput: this.fileInput,
        user: this.displayName,
      // previewImage:this.selectedImageUrl
        
      };

     this.messages = this.messages.concat(message);
      this.socketInstance.emit('message', message);
    },
  },
       
}

</script>
