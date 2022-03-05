const Neode = require('neode');

const url = 'neo4j://localhost:7687';
const username = 'neo4j';
const password = 'foodpin';

const neo4j = new Neode(url,username,password,true);

module.exports = neo4j;