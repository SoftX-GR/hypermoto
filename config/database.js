const path = require('path');
//const fs = require('fs');

module.exports = {
  development: {
    storage: path.resolve('data/bm-dev.db'),
    dialect: 'sqlite'
  },
  test: {
    storage: path.resolve('data/bm-test.db'),
    dialect: 'sqlite'
    // username: 'database_test',
    // password: null,
    // database: 'database_test',
    // host: '127.0.0.1',
    // dialect: 'mysql'
  },
  production: {
    storage: path.resolve('data/bm.db'),
    dialect: 'sqlite'

    // username: process.env.DB_USERNAME,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,
    // host: process.env.DB_HOSTNAME,
    // dialect: 'mysql',
    // dialectOptions: {
    //   ssl: {
    //     ca: fs.readFileSync(__dirname + '/mysql-ca-master.crt')
    //   }
    // }
  }
}