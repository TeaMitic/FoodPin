const redis = require('redis');

const REDIS_PORT = '6379'
const REDIS_HOST = 'localhost'


const redis_client = redis.createClient(`redis://${REDIS_HOST}:${REDIS_PORT}`);

        
;(async () => { 
    redis_client.on('ready',() => console.log('Redis is ready.'));
    redis_client.on('error',(err) => console.log('Redis Client Error',err));
    await redis_client.connect();
})();






module.exports = {
    redis_client,
    REDIS_HOST,
    REDIS_PORT
};