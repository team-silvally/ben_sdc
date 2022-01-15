// import node-postgres
const {Pool} = require('pg'); // consider using pools as well perhaps? not familiar with concept yet

// create a client connection to the db
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'ben',
  password: 'password',
  database: 'sdc_db'
});

// actually connect
pool.connect( (err) => {
  if (err) {
    console.log('error connecting to the db', err);
  } else {
    console.log('successfully connected to the db from the server (pool connection)');
  }

});

module.exports.pool = pool;