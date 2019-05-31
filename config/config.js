module.exports = {
  development: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "dealsdb",
    host: "localhost",
    port: process.env.DB_PORT,
    dialect: "mysql",
    // eslint-disable-next-line camelcase
    cloud_name: "CLOUD_NAME",
    // eslint-disable-next-line camelcase
    api_key: "CLOUD_API_KEY",
    // eslint-disable-next-line camelcase
    api_secret: "CLOUD_API_SECRET",
    // eslint-disable-next-line camelcase
    enhance_image_tag: true,
    // eslint-disable-next-line camelcase
    static_image_support: true
    // eslint-disable-next-line camelcase
  },
  test: {
    username: "root",
    password: null,
    database: "testdb",
    host: "localhost",
    dialect: "mysql",
    logging: false,
    // eslint-disable-next-line camelcase
    cloud_name: "CLOUD_NAME",
    // eslint-disable-next-line camelcase
    api_key: "CLOUD_API_KEY",
    // eslint-disable-next-line camelcase
    api_secret: "CLOUD_API_SECRET",
    // eslint-disable-next-line camelcase
    enhance_image_tag: true,
    // eslint-disable-next-line camelcase
    static_image_support: true
    // eslint-disable-next-line camelcase
  },
  production: {
    // eslint-disable-next-line camelcase
    cloud_name: "CLOUD_NAME",
    // eslint-disable-next-line camelcase
    api_key: "CLOUD_API_KEY",
    // eslint-disable-next-line camelcase
    api_secret: "CLOUD_API_SECRET",
    // eslint-disable-next-line camelcase
    enhance_image_tag: true,
    // eslint-disable-next-line camelcase
    static_image_support: true,
    // eslint-disable-next-line camelcase
    use_env_variable: "JAWSDB_URL",
    dialect: "mysql"
  }
};
