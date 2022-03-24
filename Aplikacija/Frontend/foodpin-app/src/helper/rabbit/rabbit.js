const amqp = require('amqplib')

const connect= async()=>{
    const connection = await amqp.connect('amqp://localhost')
    console.log('RabbitMQ connected')
    return connection
}

const receive = async(queueName) => { 
    const connection = await amqp.connect('amqp://localhost')
    const channel = await connection.createChannel()
    if(channel.checkQueue(queueName)){
        await channel.assertQueue(queueName, {durable: false, autoDelete: true, expires: 1800000} )        
    }
    let message;
    await channel.consume(queueName,(msg) => { 
        console.log(msg);
        message = msg.content
        let notification = `${message.usernameCurrent} ${message.content}`
        return notification
    }, {
        noAck: true
    })
}



const createQueue = async(queueName,connection)=>{
    const channel = await connection.createChannel()
    await channel.assertQueue(queueName, {durable:false, autoDelete:true, expires:18000000})
    return true
}

module.exports = {
    connect,
    send,
    createQueue,
    receive

}


