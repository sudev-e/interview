var bcrypt=require('bcrypt')
var mongoose=require('mongoose')
var User= require('../models/UserModel')
var jwt= require('jsonwebtoken')

const AdminLogin=(async(req,res)=>{
    try {
       
        const { email, password } = req.body;
 
        if (!(email && password)) {
          res.status(400).send("All input is required");
        }
       
        const user = await User.findOne({ email });
    
        if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
    
          // save user token
          user.token = token;
    
          // user
          res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
      } catch (err) {
        console.log(err);
      }
})
module.exports={
    AdminLogin
}