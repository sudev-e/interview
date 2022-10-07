var mongoose=require('mongoose')
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email: {
      type: String,
      index: { unique: true }
    },
    password: {
      type:String,
      required:true
     },
     mobile:{
        type:String,
        requried:true,
        unique: true
     }
  });
  
 
  
  module.exports = mongoose.model('User', UserSchema);