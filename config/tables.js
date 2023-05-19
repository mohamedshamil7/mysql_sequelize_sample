const { Sequelize ,DataTypes} = require('sequelize');
const connection = require('./db')
const bcrypt = require("bcrypt")


   


  
const synchronize_All_Models= async()=>{
    await connection.sync({ alter: true });
    console.log("All models were synchronized successfully.");
}


module.exports = synchronize_All_Models