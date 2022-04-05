<template>
  <div id="app">
    <div class="message">Message: <br> {{MessageTracker}}</div>
  </div>
</template>

<script>
import io from 'socket.io-client' 

export default {
  name: 'App',
  computed: {
    MessageTracker() { 
      return this.message
    }
  },
  data() {
    return {
      message: "",
      
    }
  },
  async created() {
    let socket = io('http://localhost:5000')
    socket.on('message', (message) => { 
      console.log(message);
    })
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
