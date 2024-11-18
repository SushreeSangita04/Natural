const mongoose=require ("mongoose");
mongoose.connect("mongodb://localhost:27017/firstForm",{
}).then(()=>{
   console.log(`connection successful`);
}).catch((e)=>{
    console.log(e);
}) 
const LogInschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
   
})
const collection=new mongoose.model("logincollection",LogInschema);
module.exports=collection;