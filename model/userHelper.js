const connection = require("../config/db");
const { Sequelize, DataTypes, Op } = require("sequelize");
const bcrypt = require("bcrypt");

const user = connection.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fullName: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(30),
    allowNull: false,
    validate: {
      isEmail: {
        msg: "Please provide a valid email address.",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [6, 30],
        msg: "Password  should contain more than 6 characters",
      },
    },
  },
});

user.addHook("beforeCreate", async (user) => {
  user.password = await bcrypt.hash(user.password, 2);
  console.log(user.password);
});

const cook = connection.define("Cook", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(30),
    allowNull: false,
    validate: {
      isEmail: {
        msg: "Please provide a valid email address.",
      },
    },
  },
});

const product = connection.define("products", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  productName: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  productPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

const createNewUser = async (userData) => {
  return user
    .create({
      fullName: userData.fullName,
      email: userData.email,
      password: userData.password,
    })
    .then((Row) => {
      console.log("helper then", Row, "/");
      return Row;
    })
    .catch((error) => {
      // console.log("helper catch",error.errors[0]);
      // return error.errors[0]
      throw new Error(error);
    });
};

const findIfUserExists = async (userData) => {
  try {
    const existingUser = await user.findAll({
      where: {
        email: userData.email,
      },
    });

    if (existingUser.length > 0) {
      return "Email already exists in the database";
    }

    return { status: true };
  } catch (error) {
    throw error;
  }
};

const findUser = async (userData) => {
  try {
    const userDetails = await user.findOne({
      where: {
        email: userData.email,
      },
    });
    if (userDetails == null) {
      console.log("email null");
      throw new Error("user Not found with the given email id");
    } else {
      // console.log(userDetails);
      console.log("All users:", JSON.stringify(userDetails, null, 2));
      return JSON.stringify(userDetails, null, 2);
    }
  } catch (e) {
    console.log("email notgot");
    throw new Error(e);
  }
  // .then((userDetails)=>{
  //     console.log("email got");

  // }).catch((e)=>{
  //
  //     // console.error(e,"eeeeeeee");
  //    throw new Error(e)
  // })
};

const confirmPassword = async (userDetails, user) => {
  userDetails.password = userDetails.password.trim();
  user.password = user.password.trim();
  const result = await bcrypt.compare(user.password, userDetails.password);
  if (result) return true;
  else return false;
};


const allProducts= async()=>{
    const products = await product.findAll();
    console.log(products);
    return products
}

const createProduct= async(name,price)=>{
    try{
        const newProduct  = await product.create({
            productName:name,
            productPrice:price
        }) 
        if(newProduct.dataValues){
            console.log(newProduct.dataValues);
          return newProduct.dataValues

        }else{
            console.log(newProduct);
        }
        
    }
    catch(e){
        console.log("not inserted");
      console.error(e.errors[0].message);
      throw {error:e.errors[0].message}

    }
    
}


module.exports = { createNewUser, findIfUserExists, findUser, confirmPassword,allProducts,createProduct };
