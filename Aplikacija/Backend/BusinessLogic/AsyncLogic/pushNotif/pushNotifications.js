const socketio = require('./socketio-config')

let io = socketio.getInstance()
const sendNotification = (user,notification) => { 
    try {
        io.to(user).emit('normal-notif',notification)
    } catch (error) {
        throw error
    }
} 
const sendMessage = (user,message) => { 
    try {
        io.to(user).emit('chat',message)
    } catch (error) {
        throw error
    }
}

module.exports = {
    sendNotification,
    sendMessage
}