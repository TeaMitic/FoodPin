//#region requiring basic modules
const httpServer = require('./express/express-config')
const io = require('./BusinessLogic/AsyncLogic/pushNotif/socketio-config')
const sequelize_config = require('./Persistance/mySql/config/mySql-config')
const neo4j = require('./Persistance/neo4j/config')
//#endregion

//#region requiring neo4j models 
neo4j.withDirectory(__dirname + '\\Persistance\\neo4j\\models');
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
  socket.join('didi')
  socket.send(`hello client: ${ socket.id}` )
  socket.send(`u joined the rooms` )
  socket.rooms.forEach(room => { 
    socket.send(room)
  })

  
})

//#endregion

//#region server listening
httpServer.listen(5000,() => { 
   console.log('Server is listening on port 5000...');
})

//#endregion
