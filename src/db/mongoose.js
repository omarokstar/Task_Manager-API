const mongoose=require('mongoose')
const validator = require('validator')
mongoose.connect(process.env.MongoDb,{useUnifiedTopology: true})
/*const User=mongoose.model('User',{
    name:{
        type:String,
        required:true

 
    },
    age:{
        type:Number,
  validate(value){
    if(value<0){
        throw new  Error('Age must be a positive number')
    }

}
    },
    email:{type:String,
    required:true ,
    trim:true,
    toLowerCase:true,
    validate(value){
    if(!validator.isEmail(value)){
throw new Error('this must be an email')
}
} 

    
},
password:{
    type:String,
    required:true,
    trim:true,
    minlength:7,
    validate(value){
        if(value.toLowerCase().includes('password')){
            throw new Error(' password includes password')
        }

    }
}
})
const task=mongoose.model('tasks',{
description:{
    type:String,
    required:true,

},
    completed:{
type:Boolean,
required:true,
default:false
}



})
/*

//const me =new User({name:'okstar',age:22,email:'omar55@gmail.com',password:'password55'})
const tsk=new task({description:'cleaning the home',completed:'true'})

/*me.save().then(()=>{
    console.log(me)
}).catch((error)=>{
    console.log('errrorrr',error)
})
*/
/*tsk.save().then(()=>{
    console.log(tsk)
}).catch((error)=>{
    console.log('errrorrr',error)
})*/