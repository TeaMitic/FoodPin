<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div class="message">Message: <br> {{MessageTracker}}</div>
  </div>
</template>

<script>

export default {
  name: 'App',
  computed: {
    MessageTracker() { 
      return this.message
    }
  },
  data() {
    return {
      message: ""
    }
  },
  async created() {
    //testiramo
    let wsUrl = 'ws://localhost:3000/'
    let ws = new WebSocket(wsUrl)
    ws.onopen = async () => { 
      ws.send(JSON.stringify({
        userID: "15", //userID,
        init: true
      }))
    }
    ws.onmessage = async (event) => { 
      let message = JSON.parse(event.data)
      //message from backend
      console.log(message)
      this.message = message
      if (message.type == 'Chat') { 
          //notify client about new message
          //send chat message 
      }
      else { 
          //notify client abotu new notification 
          //enable red dot 

      }
    }
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
