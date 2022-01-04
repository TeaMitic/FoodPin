const express = require('express');
const cors = require('cors');
//jwt 
const neo4j = require('./Persistance/config/neo4j_config');

const user = require('./Api service/routes/user');

neo4j.withDirectory(__dirname + '/models');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cors());

app.use('/api/user',user);

app.listen(5001,() => {
   console.log('Server is listening on port 5000...');
});