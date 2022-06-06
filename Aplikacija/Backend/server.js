//#region requiring basic modules
const httpServer = require('./express-app/express-app-config')
const sequelize_config = require('./Persistance/mySql/config/mySql-config')
const neo4j = require('./Persistance/neo4j/config')
const redis = require('./BusinessLogic/AsyncLogic/pushNotif/redis-config')
const socketio = require('./BusinessLogic/AsyncLogic/pushNotif/socketio-config');
//#endregion
//#region requiring neo4j models 
neo4j.withDirectory(__dirname + '\\Persistance\\neo4j\\models'); 
//#endregion

//#region neo4j schema 
/*koristiti neku od ovih funkcija samo kad je potrebno izmeniti schemu, u ostalim situacijama nema potrebe*/
/*sluzi za instaliranje scheme definisane modelima na bazu u cloud-u*/
// neo4j.schema.install().then(() => console.log('Schema installed!'))

/*sluzi da ocisti celu bazu zajedno sa cvorovima, ne radi bas uvek*/
//neo4j.schema.drop().then(() => console.log('Schema dropped!'))

//#endregion


//#region socketio listeners 
let io = socketio.getInstance()
io.on('connection', (socket) => { 
  socket.join(socket.data.userID)
})
//#endregion

//#region server listening
const port = 5000; 
const host = 'localhost'
httpServer.listen(port,() => { 
   console.log(`Server is listening on port "http://${host}:${port}/"...`);
})

//#endregion
