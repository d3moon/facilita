// src/config/database.js

const { Sequelize } = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize({
  dialect: 'postgres',
  logging: false,
  define: {
    timestamps: false,
  },
  username: 'tate',
  password: '1234',
  database: 'nodejs',
  host: 'localhost', // ou o host do seu banco de dados
  dialectOptions: {
    useNative: true,
    ssl: false, // Altere para true se estiver usando SSL
  },
});

module.exports = sequelize;
