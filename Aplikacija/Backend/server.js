//#region requiring basic modules
const express = require('express');
const cors = require('cors');
const neo4j = require('./Persistance/neo4j/config');
const sequelize_config = require('./Persistance/mySql/config/mySql-config')
//#endregion

//#region requiring modules for sockets 
const { Server } = require('socket.io')
const http = require('http')
const { createAdapter } = require('socket.io-redis')
const { redis_client } = require('./BusinessLogic/AsyncLogic/pushNotif/redis-config')
//#endregion 

//#region requiring routes
const user = require('./ApiService/routes/user');
const pin = require('./ApiService/routes/pin');
const board = require('./ApiService/routes/board');
const test = require('./ApiService/routes/test');
//#endregion 

//#region requiring neo4j models 
neo4j.withDirectory(__dirname + '\\Persistance\\neo4j\\models');
//#endregion

//#region express, http, socketio init
const app = express();
const httpServer = http.createServer(app)
const io = new Server(httpServer)
let redisPub = redis_client.duplicate()
let redisSub = redis_client.duplicate()
io.adapter(createAdapter(redisPub,redisSub))

//#endregion

//#region using middlewares 
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cors());
//#endregion 

//#region using routes
app.use('/api/user',user);
app.use('/api/pin',pin)
app.use('/api/board',board);
app.use('/api/test',test);
//#endregion

//#region neo4j schema 
/*koristiti neku od ovih funkcija samo kad je potrebno izmeniti schemu, u ostalim situacijama nema potrebe*/
/*sluzi za instaliranje scheme definisane modelima na bazu u cloud-u*/
// neo4j.schema.install().then(() => console.log('Schema installed!'))

/*sluzi da ocisti celu bazu zajedno sa cvorovima, ne radi bas uvek*/
// neo4j.schema.drop().then(() => console.log('Schema dropped!'

//#endregion

//#region socketio listeners 
io.on('connection', (socket) => { 
   //... 
   socket.on('chat',(anotherSocketId, msg) => { 
      socket.to(anotherSocketId).emit('chat',socket.id, msg)
   }) // for chatting 
})
//#endregion

//#region server listening
httpServer.listen(5000,() => { 
   console.log('Server is listening on port 5000...');
})

//#endregion\
