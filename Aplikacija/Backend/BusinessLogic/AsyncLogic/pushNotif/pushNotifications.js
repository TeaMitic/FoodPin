// const io = require('./socketio-config')

const hellotest = () => { 
    io.to('didi').emit('Message from room')
}

module.exports = hellotest

