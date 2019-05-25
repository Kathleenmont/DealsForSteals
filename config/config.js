module.exports = {
  development: {
    username: "root",
<<<<<<< HEAD
    password: process.env.DB_password,
    database: "exampledb",
    host: "localhost",
    port:3306,
=======
    password: process.env.DB_PASSWORD,
    database: "dealsdb",
    host: "localhost",
    port: process.env.DB_PORT,
>>>>>>> c0f0829b98326935b866e952afa4043ba32359df
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
<<<<<<< HEAD
    use_env_variable: "JAWSDB_URL",
    dialect: "mysql"
  }
}
=======
    // eslint-disable-next-line camelcase
    use_env_variable: "JAWSDB_URL",
    dialect: "mysql"
  }
};
>>>>>>> c0f0829b98326935b866e952afa4043ba32359df
