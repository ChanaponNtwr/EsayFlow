const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  host: process.env.db_host, // Postgres ip address[s] or domain name[s]
  port: 5432, // Postgres server port[s]
  database: process.env.db_name, // Name of database to connect to
  user: process.env.db_user, // Username of database user
  password: process.env.db_password, // Password of database user
});

client.connect();

module.exports = { client };
