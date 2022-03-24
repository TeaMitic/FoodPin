<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div class="message">Message: <br></div>
  </div>
</template>

<script>
const rabbit = require('./helper/rabbit/rabbit')

export default {
  name: 'App',
  data() {
    return {
      message: ""
    }
  },
  async created() {
    this.message = await rabbit.receive("7e72bbfe-8ebf-4956-9e72-a5d8b5cc2913",conneciton)
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
