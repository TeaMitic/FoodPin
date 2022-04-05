const httpServer = require('../../../express/express-config')
const { Server } = require('socket.io')
const { createAdapter } = require('@socket.io/redis-adapter')
const { redis_client } = require('./redis-config')
// const { createClient } = require('redis')

const io = new Server(httpServer, {
    cors: { 
        origin: '*',
    }
})
const pubClient = redis_client.duplicate()
const subClient = redis_client.duplicate()
io.adapter(createAdapter(pubClient,subClient))

module.exports = io