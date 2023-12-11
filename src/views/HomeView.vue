<template>
    <img src="./img/back_pages.png" class="back_pages">
  <div class="home">

  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
   // HelloWorld
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
}
</style>