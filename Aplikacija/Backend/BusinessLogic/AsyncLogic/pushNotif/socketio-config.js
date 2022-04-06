const httpServer = require('../../../express/express-config')
const { Server } = require('socket.io')
const { createAdapter } = require('@socket.io/redis-adapter')
const { redis_client } = require('./redis-config')
let instance = null

 function  init() { 
    let io = new Server(httpServer, {
        cors: { 
            origin: '*',
        }
    })

    const pubClient = redis_client.duplicate()
    const subClient = redis_client.duplicate()
    Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
        io.adapter(createAdapter(pubClient, subClient));
    });
    // io.adapter(createAdapter(pubClient,subClient))
    instance = io  
    

}
 function  getInstance() { 
    if (!instance) {
         init()
    }
    return instance
}


module.exports = { 
    getInstance,
}