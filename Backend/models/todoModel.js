var mongoose=require('mongoose')
const TodoSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    userid:{
        type:String,
    },
    timestamps: { createdAt: true, updatedAt: false }
    
  });
  
 
  
  module.exports = mongoose.model('Todo', TodoSchema);