const express = require('express')
const Task = require('../models/tasks')
const auth=require('../middleware/auth')
const router=new express.Router()

router.post('/tasks',auth, async(req, res) => {
   // const task = new Task(req.body)
    const task=new Task({
        ...req.body,
        owner:req.user._id

    })
       /*task.save().then(() => {
        res.send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })*/

    try{
  await task.save()
   res.status(201).send(task)

    }
    catch(e){
        res.status(400).send(e)


    }
})




router.get('/tasks',auth,async(req,res)=>{


/* Task.find({}).then((task)=>{
    return res.send(task)
 }).catch((e)=>{
res.status(500).send()
 })
*/
try{
    const match={}
    if(req.query.completed){
   match.completed=req.query.completed==='true'

    }
    const sort={}

    if(req.query.sortBy){
        const parts=req.query.sortBy.split(':')
        sort[parts[0]]=parts[1]==='desc'?-1:1
        console.log(sort)
    }
await req.user.populate({path:'tasks',match,options:{
    limit:parseInt(req.query.limit),
    skip:parseInt(req.query.skip),
    sort
}
})


//const tasks=await Task.find({owner:req.user._id})
res.send(req.user.tasks)

}
catch(e){
 res.status(500).send()

}
})

router.get('/tasks/:id',auth,async(req,res)=>{
    const _id=req.params.id
    
    /*Task.findById(_id).then((task)=>{
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    
    }
    ).catch((e)=>{
        return res.status(500).send()
    })
    /*
*/ 
try {
const task=await Task.findOne({_id,owner:req.user._id})
if(!task){
    res.status(404).send()
}
res.send(task)


} catch (e) {
    res.status(500).send(e)
}
})

router.patch('/tasks/:id',auth,async(req,res)=>{
    
const updates=Object.keys(req.body)
const allowedUpdates=['description','completed']
const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))
if(!isValidOperation){
    res.status(400).send({error:'Invalid Updates !'})
}
try{
//    const task=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
const task=await Task.findOne({_id:req.params.id,owner:req.user._id})

    if(!task){

        res.status(404).send()
    }
    updates.forEach((update)=>{req.user[update]=req.body[update]})
    await task.save()

res.send(task)
}

catch(e){
    res.status(400).send(e)
    console.log(e)
}
 

})


router.delete('/tasks/:id',auth,async(req,res)=>{
    try{
    const task=await Task.findOneAndDelete({_id:req.params.id,owner:req.user.id})
    if(!task){
        res.status(404).send()
    }
    res.send(task)
    
    
    }catch(e){
        res.status(500).send(e)
    }
    
    })
    
    



module.exports=router