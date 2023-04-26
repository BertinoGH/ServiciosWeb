const mongoose=require('mongoose')
const url= process.env.MONGODB_URI

mongoose.connect(url)
.then(result=>{
    console.log('Conected to MongoDB')
})
.catch(result=>{

})

const NoteSchema= new mongoose.Schema({
    name: String,
    number: String
})

NoteSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id=returnedObject._id.toString()
        delete returnedObject.__v
    }
})

module.exports=mongoose.model('Person',NoteSchema)