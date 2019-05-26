module.exports = {
  development: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "dealsdb",
    host: "localhost",
    port: process.env.DB_PORT,
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
    // eslint-disable-next-line camelcase
    use_env_variable: "JAWSDB_URL",
    dialect: "mysql"
  }
};
