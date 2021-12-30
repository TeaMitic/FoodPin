const Neode = require('neode')

const url = 'neo4j+s://ef7194b6.databases.neo4j.io:7687'
const username = 'neo4j'
const password = 'OhoOkHaL1nMlUQZGgE-PHn9HyxReSrXve4Nf00KfzK4'

const neo4j = new Neode(url,username,password,true)

module.exports = neo4j