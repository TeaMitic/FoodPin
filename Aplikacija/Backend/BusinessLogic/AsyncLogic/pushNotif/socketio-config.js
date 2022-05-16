let instance = null

function  init() { 
    const httpServer = require('../../../express-app/express-app-config')
    const { Server } = require('socket.io')
    const { createAdapter } = require('@socket.io/redis-adapter')
    const { redis_client } = require('./redis-config')
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