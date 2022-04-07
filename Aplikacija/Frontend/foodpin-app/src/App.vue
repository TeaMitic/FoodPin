<template>
  <div id="app">
    <router-view></router-view>
    <!-- <img alt="Vue logo" v-bind:src=photo > -->
    <!-- <div class="message">Message: <br> {{MessageTracker}}</div> -->
  </div>
</template>

<script>
// import Vue from 'vue'
export default {
  name: 'App',
  computed: {
    // MessageTracker() { 
    //   return this.message
    // }
  },
  // data() {
  //   return {
  //     message: "",
  //     photo: null
  //   }
  // },
  async created() {
    //testiramo slike
    

    // //testiramo ws 
    // let wsUrl = 'ws://localhost:3000/'
    // let ws = new WebSocket(wsUrl)
    // ws.onopen = async () => { 
    //   ws.send(JSON.stringify({
    //     userID: "15", //userID,
    //     init: true
    //   }))
    // }
    // ws.onmessage = async (event) => { 
    //   let message = JSON.parse(event.data)
    //   //message from backend
    //   console.log(message)
    //   this.message = message
    //   if (message.type == 'Chat') { 
    //       //notify client about new message
    //       //send chat message 
    //   }
    //   else { 
    //       //notify client abotu new notification 
    //       //enable red dot 

    //   }
    
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.message { 
  border: 1px solid black;
}
</style>
