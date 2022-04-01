const redis_client = require('./redis-config')
const WebSocket = require('ws')


const WEB_SOCKET_PORT = 3000;

const wss = new WebSocket.Server({ port : WEB_SOCKET_PORT });

var redisClient = redis_client.duplicate();

redisClient.connect();
wss.on('connection', async function connection(ws) {
  //   // broadcast on web socket when receving a Redis PUB/SUB Event
    ws.on('message',async function message(data){   
      let response = JSON.parse(data)
      if(response.init){
          console.log("connected",response)
          ws.id = response.userID
          console.log(wss.clients);
      }
    }) 
    redisClient.subscribe('app:notif',  (message) => { 
        let response = JSON.parse(message)
        wss.clients.forEach(function each(client) {      
            console.log("client", client.id);          
            console.log("message", message);
            if(response.userID == client.id){
            client.send(message)

        }
      });
      
    });
});




module.exports = wss;