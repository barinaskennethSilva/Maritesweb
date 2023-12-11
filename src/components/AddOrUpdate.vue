<template>
<translation name="modal">
    <div class="modal-overlay">
  <div class="modal-wrapper">
    <div class="modal-container">
    <input type="text" placeholder="Enter Name" v-model="task.name" />  
    <textarea placeholder="Enter Description" v-model="task.description" />  
    <button @click = "emits('close')">Close</button>
    <button @click = "AddOrUpdate()">{{ isNew ? 'Add' : 'update'}}</button>
    </div>
  </div>
  </div>
</translation>
</template>

<script setup>
import {defineComponent, ref} from 'vue';

const props = defineProps({
  data: Object,
  isNew: Boolean
})
defineComponent({
  name: 'AddOrUpdate'
})
const emits =  defineEmits(['close']);
const task = ref({
  name:'',
  description:''
});
</script>


<style scoped>

</style>
