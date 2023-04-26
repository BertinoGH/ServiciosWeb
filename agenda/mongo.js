const mongoose=require('mongoose')
if(process.argv.length<3){
    console.log("Error, need provide password: node mongo.js <password>")
    process.exit(1)
}if(process.argv.length<4){
    console.log("Error, need provide name of note: node mongo.js <password> <note name>")
    process.exit(1)
}
    

const password=process.argv[2]
const message=process.argv[3]
const url=`mongodb+srv://fullstack:${password}@cluster0.docnj76.mongodb.net/app-note?retryWrites=true&w=majority`

mongoose.connect(url)

const NoteSchema= new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person',NoteSchema)

const person= new Person({
    name:"hola",
    number:"1234556"
})

Person.find({}).then(result=>{
    result.forEach(person=>{
        console.log(person)
    })
    mongoose.connection.close()
})

person.save().then (result=>{
    console.log('Note Saved')
    console.log(result)
    mongoose.connection.close()
})
