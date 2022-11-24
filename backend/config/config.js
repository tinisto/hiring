module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "b956eff98c476c",
    password: "a26ee48a",
    database: "heroku_889b88bba043a99",
    host: "us-cdbr-east-06.cleardb.net",
    dialect: "mysql",
  },
}
