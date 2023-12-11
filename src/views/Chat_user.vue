
<template>
  <div>
  <img src="./img/msg_background.png" alt="pic" class="back_pages">
     <nav class="navbar navbar-expand-lg bg-dark">
  <div class="container-fluid">
 <router-link to="/main_form"  class="navbar-brand ms-3 fw-bold h2 text-white"  > <i class="bi bi-arrow-left me-3 "></i>{{ roomName }}</router-link>
           
  </div>
</nav>
   
    <div class="text-container">  
    <div v-for="message in messages" :key="message.id">
      
    
      
<div class="sender">
    <div class="d-flex flex-column">
    <div class="output-send d-flex flex-column">
        <label for="myname" class="ms-3">{{ message.user }}</label>
   <template v-if="message.text">
          <p>{{ message.text }}</p>
        </template>
        
  <div v-else-if="message.fileInput" class="picSend">
    <img :src="message.fileInput" alt="User's Image" class="chat-image" style="height: 200px !important; width: 200px !important;margin: 10px 20px;">
      </div>
  </div>
        <p class="ms-3 text-white">{{ formattedDate }}</p>
</div>
      </div>
  
  
 </div>
    </div>
  
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
 <input type="file" @change="onFileChange" ref="fileInput" id="img" @input="pickFile">
       </div> 
    <div class="imagePreviewWrapper" v-if="imagePreviewWrapper">
  
    <div class="imgView" :style="{ 'background-image': `url(${previewImage})` }" @click="selectImage"> </div>
 
    
 <div class="d-flex">
   
     <button class="btn btn-danger fw-bold ms-2 w-50" @click="CloseImg">Cancel</button>
    <button class="btn btn-primary w-50 fw-bold ms-2 me-2" type="submit"  @click="sendPic">Send</button>
  </div>
        </div> 
  
</template>



<script>
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import io from "socket.io-client";
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import {db} from '../main.js';
import { auth } from '../main.js';
import moment from 'moment';
export default {
  name:'Contact_pages',
  computed: {
    roomName() {
      return this.$route.params.roomName;
    }
  },
  data() {
    return {
      imageUrl: null,
      selectedFile: null,
      text: '',
      messages: [], 
          previewImage: null,
imagePreviewWrapper: false,
selectedImage:null,
fileInput: "",
    };
  },
  beforeUpdate(){
    if (auth.currentUser) {
      this.displayName = auth.currentUser.displayName
    }    
      },
  created() {
    this.connectToSocket();
  const currentDate = moment();
    this.formattedDate = moment().format('YYYY-MM-DD HH:mm:ss');

  },    
  methods: {
    async onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        try {
          const storage = getStorage();
          const storageRef = ref(storage, 'msg_pic/' + file.name);
          await uploadBytes(storageRef, file);
          const url = await getDownloadURL(storageRef);
          this.imageUrl = url;
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }
    },
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
    sendPic() {
      this.addMessage();
      this.imagePreviewWrapper = !this.imagePreviewWrapper
      this.previewImage = ""
    },
    toggleImg(){
      this.imagePreviewWrapper = !this.imagePreviewWrapper
    },
    CloseImg(){
      this.imagePreviewWrapper = !this.imagePreviewWrapper
      this.previewImage = ""
    },
async  sendMessage(e) {
          this.addMessage();
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
        fileInput: this.imageUrl,
        user: this.displayName,
      };
      this.messages = this.messages.concat(message);
      this.socketInstance.emit('message', message);
    },
    connectToSocket() {
      this.socketInstance = io("http://localhost:3000");
      this.socketInstance.on(
        "message:received", (data) => {
          this.messages = this.messages.concat(data);
        }
      )
    },
  }
}
</script>

<style scoped>
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
#img{
 display: none; 
}
#file{
  color: #fff;
  margin-left: 20px;
  font-size: 35px;
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

 .imagePreviewWrapper{
    position: absolute;
    bottom: 0px;
    left: 0px;
    background-color: #fff;
    width: 100%;
    height: 400px;
    
  }
 .imgView{
    height: 320px;
    width: 90%;
    border: dashed;
    margin:10px auto;
    display: block;
    background-size: 100% 100% !important;
  }
  .chat-image{
    height: 200px !important;
    width: 200px !important;
  }
</style>
