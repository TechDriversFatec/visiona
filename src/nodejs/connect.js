const mysql = require('promise-mysql');

const dbConfig = {
  user: 'enzogerola',
  password: '@Enzo9900',
  database: 'visiona',
  host: '158.69.2.191',
  connectionLimit: 10
};

module.exports = async () => {
  try{
    let pool;
    let conn;

    if(pool) conn = pool.getConnection();
    else{
      pool = await mysql.createPool(dbConfig);
      conn = pool.getConnection();
    }
    return conn;
  } catch (exc) {
    throw exc;
  }
};
