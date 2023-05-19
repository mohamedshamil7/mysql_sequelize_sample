const { Sequelize } = require('sequelize');
require("dotenv").config()


const connection = new Sequelize(process.env.dbName, process.env.username, process.env.password, {
  dialect:'mysql' ,
  host:"localhost"
})



module.exports = connection