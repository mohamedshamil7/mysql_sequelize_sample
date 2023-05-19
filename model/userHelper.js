const connection= require("../config/db")
const { Sequelize, DataTypes,Op} = require('sequelize');
const bcrypt = require("bcrypt")


const  user = connection.define('User',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,

    },
    fullName:{
      type: DataTypes.STRING(30),
      allowNull:false
    },
    email:{
        type:DataTypes.STRING(30),
        allowNull:false,
        validate:{
            isEmail:{
                msg: 'Please provide a valid email address.',
            }
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:{
                args:[6,30],
                msg:"Password  should contain more than 6 characters"
            }
            }

    }

  });

  user.addHook('beforeCreate',async (user)=>{
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  })



    const createNewUser=async (userData)=>{

      return  user.create({
                fullName:userData.fullName,
                email:userData.email,
                password:userData.password
            }).then((Row)=>{
                console.log("helper then",Row,"/");
                return Row
            }).catch((error)=>{
                // console.log("helper catch",error.errors[0]);
                // return error.errors[0]
                throw new Error(error)
            })
       
    }

    const findIfUserExists=async(userData)=>{
        try {
            const existingUser = await user.findAll({
              where: {
                email: userData.email,
              },
            });
        
            if (existingUser.length > 0) {
              return ("Email already exists in the database");
            }
        
            return { status: true };
          } catch (error) {
            throw error;
          }
    }



    module.exports={createNewUser,findIfUserExists}