const Neode = require('neode');

const url = 'neo4j://localhost:7687';
const username = 'neo4j';
const password = 'foodpin';

let neo4j = new Neode(url,username,password,false);
( async () => { 
    let result = await neo4j.readCypher('match (n) return n limit 1')
    if (result.records.length > 0) { console.log('Neo4j is ready.');}
    else { console.log('Neo4j is not ready.');}
})()

module.exports = neo4j;