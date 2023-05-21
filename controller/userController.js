const connection = require("../config/db");
const {
  createNewUser,
  findIfUserExists,
  findUser,
  confirmPassword,
  allProducts,
  createProduct
} = require("../model/userHelper");

const userLogin = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      console.log("data incorrect ");
      return res.status(404).send("Please add required data");
    } else {
      findUser(req.body)
        .then((userData) => {
          console.log("userData  ::", userData);
          confirmPassword(JSON.parse(userData), req.body).then((result) => {
            if (result == true) {
              console.log("user succesfully loggedIn");
              return res.status(200).send("user succesfully loggedIn");
            } else {
              console.log("email and password not matching");
              return res.status(401).send("email and password not matching");
            }
          });
        })
        .catch((e) => {
          if (e instanceof Error) {
            const errorMessage = e.message;
            console.log("Validation error:", errorMessage);
            return res.status(404).send(errorMessage);
          }
          return res.status(404).send(e);
        });
    }
  } catch (e) {
    console.log(e);
    if (e instanceof Error) {
      console.log("entered");
      const errorMessage = e.message;
      console.log("Validation error:", errorMessage);
      return res.status(404).send(errorMessage);
    }

    return res.status(404).send(e);
  }
};

const createUser = async (req, res) => {
  try {
    if (!req.body.fullName || !req.body.email || !req.body.password) {
      console.log("data incorrect ");
      return res.status(404).send("Please add required data");
    }

    const error = await findIfUserExists(req.body);
    if (!error.status) {
      console.log("User Already Exists");
      return res.status(404).send("User Already Exists");
    } else {
      createNewUser(req.body)
        .then((data) => {
          console.log(`user succesfully Created with emailId : ${data.email}`);
          return res
            .status(200)
            .send(`user succesfully Created with emailId : ${data.email}`);
        })
        .catch((e) => {
          if (e instanceof Error) {
            console.log("entered");
            const errorMessage = e.message;
            console.log("Validation error:", errorMessage);
            return res.status(404).send(errorMessage);
          }
          console.log("inside catchs", e);
          return res.status(404).send(e);
        });
    }
  } catch (error) {
    console.log("iasddd", error);

    return res.status(404).send(error);
  }
};



const getAllProducts= async(req,res)=>{
    try {
        const product = await allProducts()
        // if (product){res.send(product)}

    }
    catch(e){
        console.log(e);
    }
}

const newProduct= async(req,res)=>{
    try {
        const {name,price}= req.body
        const product = await createProduct(name,price)
        
        res.status(201).send(product)
    }
    catch(e){
        res.status(400).send(e)
    }
}


module.exports = { userLogin, createUser, getAllProducts,newProduct };
