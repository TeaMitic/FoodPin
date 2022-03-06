const express = require('express');
const cors = require('cors');
//jwt 
const neo4j = require('./config/neo4j_config');

const user = require('./Api service/routes/user');
const recipe = require('./Api service/routes/recipe');

neo4j.withDirectory(__dirname + '\\Persistance\\models');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cors());

app.use('/api/user',user);
app.use('/api/recipe',recipe);


/*koristiti neku od ovih funkcija samo kad je potrebno izmeniti schemu, u ostalim situacijama nema potrebe*/
/*sluzi za instaliranje scheme definisane modelima na bazu u cloud-u*/
//neo4j.schema.install().then(() => console.log('Schema installed!'))

/*sluzi da ocisti celu bazu zajedno sa cvorovima, ne radi bas uvek*/
// neo4j.schema.drop().then(() => console.log('Schema dropped!'))

app.listen(5000,() => {
   console.log('Server is listening on port 5000...');
});