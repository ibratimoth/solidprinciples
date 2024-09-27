const { Sequelize } = require('sequelize');
const dotenv = require("dotenv");
dotenv.config()

//Database configuration

const sequelize = new Sequelize('solid', 'postgres', process.env.DB_PASS, {
  host: 'localhost',
  dialect: 'postgres'
});


const connectionDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ alter: true })
    console.log('Database synced')
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = { connectionDB, sequelize }