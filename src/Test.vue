   <router-link class="nav-link" v-for="roomDetail in Room_Details" :key="roomDetail.id"
      :to="'/Chat_user/' + roomDetail.id">


<template>
  <div>
    <!-- Input field for entering a message -->
    <input v-model="message" placeholder="Enter a message" />
    <button @click="addNewMessage">Add Message</button>
    
    <!-- List of messages -->
    <h2>Messages:</h2>
    <ul>
      <li v-for="message in messages" :key="message.id">
        {{ message.text }}
        <button @click="deleteMessage(message.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { ref, reactive, watchEffect } from 'vue'; // Import Vue Composition API
import {db} from './main.js';
export default {
  data() {
    return {
      message: "",
      messages: [],
    };
  },
  methods: {
    async addNewMessage() {
      try {
        const docRef = await addDoc(collection(db, 'messages'), {
          text: this.message,
          date: Date.now()
        });
        console.log('Message added with ID: ', docRef.id);
        this.message = ''; // Clear the input field after adding
      } catch (error) {
        console.error('Error adding message: ', error);
        // You can display an error message to the user or handle it in another way.
      }
    },

    fetchMessages() {
      const messagesCollection = collection(db, 'messages');

      onSnapshot(messagesCollection, (querySnapshot) => {
        this.messages = []; // Clear the existing messages array
        querySnapshot.forEach((doc) => {
          this.messages.push({
            id: doc.id,
            text: doc.data().text,
            date: doc.data().date,
          });
        });
      }, (error) => {
        console.error('Error fetching messages: ', error);
        // Handle the error, e.g., display an error message.
      });
    },

    deleteMessage(messageId) {
      // Your existing deleteMessage method code
    },
  },
  mounted() {
    // Fetch messages when the component is mounted
    this.fetchMessages();
  },
};
</script>