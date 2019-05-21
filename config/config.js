module.exports = {
  development: {
    username: "root",
    password: process.env.DB_password,
    database: "exampledb",
    host: "localhost",
    port:3306,
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: null,
    database: "testdb",
    host: "localhost",
    dialect: "mysql",
    logging: false
  },
  production: {
    use_env_variable: "JAWSDB_URL",
    dialect: "mysql"
  }
}
