const amqp = require('amqplib')

const connect= async()=>{
    const connection = await amqp.connect('amqp://localhost')
    console.log('RabbitMQ connected')
    return connection
    //connection.close()?


}
const connection = await connect()

const send = async(msg, queueName) =>{
    const channel = await connection.createChannel()
    if(channel.checkQueue(queueName)){
        await channel.assertQueue(queueName, {durable: false, autoDelete: true, expires: 1800000} )        
    }
    channel.sendToQueue(queueName, Buffer.from(msg))

    return true
}

const createQueue = async(queueName)=>{
    const channel = await connection.createChannel()
    await channel.assertQueue(queueName, {durable:false, autoDelete:true, expires:18000000})
    return true
}

module.exports = {
    connection,
    send,
    createQueue

}


