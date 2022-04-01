
let wsUrl = 'ws://localhost:3000/'
let ws = new WebSocket(wsUrl)
module.exports = { 
    connect(userID) { 
        ws.onopen = async (event) => {         
            ws.send(JSON.stringify({
                userID: userID,
                init: true
            }))
        }
        ws.onmessage = async (event) => { 
            let message = JSON.parse(event.data)
            //message from backend
            if (message.type == 'Chat') { 
                //notify client about new message
                //send chat message 
            }
            else { 
                //notify client abotu new notification 
                //enable red dot 
            }
        }
    }
}
