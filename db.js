const { Pool } = require("pg");

async function connect() {

  const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
   

  //   host: 'autorack.proxy.rlwy.net',
  // port: 35108,                     
  // user: 'postgres',             
  // password: 'IJeFtvXTUUKpmaagXxnssMiDZwjmvBCN',          
  // database: 'VendasWeb',       
  // ssl: {
  //   rejectUnauthorized: false      

  // }
  });

  const client = await pool.connect();

  client.release();


  return pool.connect();
}

module.exports = connect