const express = require('express');
const cors = require('cors');
const neo4j = require('./Persistance/neo4j/config');
const sequelize = require('./Persistance/mySql/config')

const user = require('./ApiService/routes/user');
const pin = require('./ApiService/routes/pin');
const board = require('./ApiService/routes/board');
const test = require('./ApiService/routes/test')

neo4j.withDirectory(__dirname + '\\Persistance\\neo4j\\models');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cors());

app.use('/api/user',user);
app.use('/api/pin',pin)
app.use('/api/board',board);
app.use('/api/test',test);

/*koristiti neku od ovih funkcija samo kad je potrebno izmeniti schemu, u ostalim situacijama nema potrebe*/
/*sluzi za instaliranje scheme definisane modelima na bazu u cloud-u*/
//neo4j.schema.install().then(() => console.log('Schema installed!'))

/*sluzi da ocisti celu bazu zajedno sa cvorovima, ne radi bas uvek*/
//neo4j.schema.drop().then(() => console.log('Schema dropped!'))

app.listen(5000,() => {
   console.log('Server is listening on port 5000...');
});

