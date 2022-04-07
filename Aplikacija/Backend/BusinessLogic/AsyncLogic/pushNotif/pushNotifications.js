const socketio = require('./socketio-config')

const sendNotification = (room,eventName, content) => { 
    try { 
        let io = socketio.getInstance()
        io.to(room).emit(eventName,content)
    }
    catch(error) { 
        throw error
    }
}

const like = (payload) => { 
    try {
        // payload = { 
        //     emitterUsername,
        //     receiverID,
        //     pinID
        // }
        let likeNotification = { 
            content: `${payload.emitterUsername} liked your pin.`,
            pinID: payload.pinID 
        }
        sendNotification(receiverID,'pin-notif',likeNotification)
    } catch (error) {
        throw error
    }
}

const comment = (payload) => { 
    try {
        // payload = { 
        //     emitterUsername,
        //     receiverID,
        //     pinID,
        //     comment
        // }
        let commentNotification = { 
            content: `${payload.emitterUsername} commented on your pin.`,
            pinID: payload.pinID,
            // comment: payload.comment
            //? da li nam treba sadrzaj komentara, ili cemo da ga pribavimo iz mysql-a? 
        }
        sendNotification(receiverID,'pin-notif',commentNotification)
    } catch (error) {
        throw error
    }
}

const savePin = (payload) => { 
    try {
        // payload = { 
        //     emitterUsername,
        //     receiverID,
        //     pinID
        // }
        let savePinNotification = { 
            content: `${payload.emitterUsername} saved your pin.`,
            pinID: payload.pinID 
        }
        sendNotification(receiverID,'pin-notif',savePinNotification)
    } catch (error) {
        throw error
    }
}

const follow = (payload) => { 
    try {
        // payload = { 
        //     emitterUsername,
        //     receiverID,
        // }
        let followPinNotification = { 
            content: `${payload.emitterUsername} started following you.`,
        }
        sendNotification(receiverID,'normal-notif',followPinNotification)
    } catch (error) {
        throw error
    }
}

const message = (payload) => { 
    try {
        // payload = { 
        //     emitterUsername,
        //     receiverID,
        //     text
        // }
        let messageNotification = { 
            // * Neka ga ovako za sada 
            content: `${payload.emitterUsername} sent you a message.`,
            meesage: payload.text
        }
        sendNotification(receiverID,'chat-notif',messageNotification)
    } catch (error) {
        throw error
    }
}



module.exports = {
    like,
    comment,
    savePin,
    follow,
    message

}