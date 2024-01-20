const mongoose=require('mongoose')
const taskSchema=new mongoose.Schema({
    description:{
        type:String,
        required:true,
    
    },
        completed:{
    type:Boolean,
    required:true,
    default:false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'

    }




},
    {timestamps:true}
    
    
    )
const task=mongoose.model('tasks',taskSchema)


module.exports=task




