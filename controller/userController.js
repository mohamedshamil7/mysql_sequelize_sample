const connection = require("../config/db");
const {
    createNewUser,
    findIfUserExists
}= require("../model/userHelper")


const userLoginSubmit =(req,res)=>{

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


module.exports= {userLoginSubmit,createUser}