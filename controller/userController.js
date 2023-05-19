
const connection = require("../config/db");
const {
    createNewUser,
    findIfUserExists,
    findUser,
    confirmPassword
}= require("../model/userHelper")


const userLogin =async (req,res)=>{
try{
    if(!req.body.email ||!req.body.password){
        console.log("catch error try working");
        return res.status(404).send("Please add required data")
    }else{
        console.log("entered else");
       findUser(req.body).then((userData)=>{
            console.log(":::::::::",userData,"userData>>>>>>>>>");
            confirmPassword( JSON.parse(userData) ,req.body).then((result)=>{
                if(result==true){
                    return res.status(200).send("user Data found",userData.email,userData.password);
                    
                }else{
                    
                    return res.status(401).send("email and password not matching",);
                }
            })
        })
        .catch((e)=>{
            if (e instanceof Error) {
                console.log("entered");
                const errorMessage = e.message;
                console.log("Validation error:", errorMessage);
                return res.status(404).send(errorMessage);
              }
            console.log("this status");
            return res.status(404).send(e);
        })
    }
   

}catch (e){
    console.log(e);
    if (e instanceof Error) {
        console.log("entered");
        const errorMessage = e.message;
        console.log("Validation error:", errorMessage);
        return res.status(404).send(errorMessage);
      }
    
    return res.status(404).send(e);
}
}

const createUser = async(req,res)=>{
    console.log("unsude");
    console.log(req.body,"/hdaosdnoincnccncn")
    try {
        if (!req.body.fullName || !req.body.email || !req.body.password) {
          console.log("catch error try working");
          return res.status(404).send("Please add required data");
        }
      
        const error = await findIfUserExists(req.body);
        if (!error.status) {
            console.log("catch error try working");
            return res.status(404).send("User Already Exists");
        }else{
            
    createNewUser(req.body).then((data) => {
        console.log("inside then", data);
        return res.status(200).send(`user succesfully Created with emailId : ${data.email}`);
      })
      .catch((e) => {
        if (e instanceof Error) {
            console.log("entered");
            const errorMessage = e.message;
            console.log("Validation error:", errorMessage);
            return res.status(404).send(errorMessage);
          }
        console.log("inside catchs",  e);
        return res.status(404).send(e);
    });
}
} catch (error) {
          console.log("iasddd", error);

        return res.status(404).send(error);
      }

   
}


module.exports= {userLogin,createUser}