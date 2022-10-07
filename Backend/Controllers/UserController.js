var bcrypt=require('bcrypt')
var mongoose=require('mongoose')
var User= require('../models/UserModel')
var Todo= require('../models/todoModel')
var jwt= require('jsonwebtoken')

const Register=(async(req,res)=>{
    try {
        let userdata=req.body
        if(userdata){
        let data=  User.find({email:userdata.email})
        if(data){
            res.send('{message:user already exist}')
        }else{
            const passwordHash = bcrypt.hashSync(userdata.password, 10);
        userdata.password=passwordHash
            let user= await User.create(userdata)
            if(user){
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
                res.status(200,'{message:user registered}')
            }else{
                res.status(500).send('err')
            }
        }
        }

    } catch (err) {
        res.status(500).send(err)
    }
})

const Login=(async(req,res)=>{
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


const addTodo=(async(req,res)=>{
    const todo=req.body
  if(todo){
     todocreate=Todo.create(todo)
     if(todo){
        res.send(todo)
     }else{
        res.status(400).send("error");
     }
  }else{
    res.status(400).send("please enter todo");
  }
})

const deleteTodo=(async(req,res)=>{
 const id= req.params._id
 const remove= await Todo.deleteOne({_id:id})
  if(remove){
    res.send('deleted')
  }
})

const getTodos=(async(req,res)=>{
    const todo= Todo.find()
    if(todo){
        res.status(200).send(todo)
    }else{
        res.status(400).send("error");
    }
})

const edittodo

module.exports={
    Register,
    Login,
    addTodo,
    deleteTodo,
    getTodos,

}