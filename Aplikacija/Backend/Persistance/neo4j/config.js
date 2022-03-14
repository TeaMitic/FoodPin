const Neode = require('neode');

const url = 'neo4j://localhost:7687';
const username = 'neo4j';
const password = 'foodpin';

// let neo4j = null
// try {
//     neo4j = new Neode(url,username,password,false);
//     neo4j.cypher('match (n) return n limit 1').then(res => console.log(res))
//     console.log('Neo4j ready.')
// } catch (error) {
//     console.log('Neo4j not ready.')
    
// }
let  neo4j = new Neode(url,username,password,false);

    


module.exports = neo4j;