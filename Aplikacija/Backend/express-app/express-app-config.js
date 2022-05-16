const express = require('express')
const cors = require('cors');
const http = require('http')

//#region requiring routes
const user = require('../ApiService/routes/user');
const pin = require('../ApiService/routes/pin');
const board = require('../ApiService/routes/board');
const test = require('../ApiService/routes/test');
//#endregion 

const app = express()

//#region using middlewares 
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cors());
//#endregion 

//#region using routes
app.use('/api/user',user);
app.use('/api/pin',pin)
app.use('/api/board',board);
app.use('/api/test',test);
//#endregion

const httpServer = http.createServer(app)  

module.exports = httpServer