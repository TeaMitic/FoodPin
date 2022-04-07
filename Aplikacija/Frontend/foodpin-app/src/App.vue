<template>
  <div id="app">
    <div class="message">Client: <br> {{clientTracker}}</div>
    <div class="message">Message: <br> {{MessageTracker}}</div>
    <div class="notif">Notification: <br> {{NotifTracker}}</div>
  </div>
</template>

<script>
import io from 'socket.io-client' 

export default {
  name: 'App',
  computed: {
    MessageTracker() { 
      return this.poruka
    },
    NotifTracker() { 
      return this.notification
    },
    clientTracker() { 
      return this.client
    }
  },
  data() {
    return {
      poruka: "",
      notification: "",
      client: ""
      
    }
  },
  async created() {
    let socket = io('http://localhost:5000', {
      autoConnect: false
    })
    socket.connect()
    socket.on('connect', () => { 
      this.client = socket.id
    })
    socket.on('normal-notif', (message) => { 
      this.notification = message
    })
    socket.on('chat', (message) => { 
      this.poruka = message
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
.message, .notif { 
  border: 1px solid black;
  margin-top: 3px;
}
</style>
