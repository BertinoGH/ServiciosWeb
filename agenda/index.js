require('dotenv').config()
const port = process.env.PORT;
const { request, response } = require('express')
const express = require('express')

const cors =require('cors')
const Person = require('./models/person')
const app = express()


app.use(express.json())
app.use(cors())
const requestLogger = (request, response, next) => {
    console.log('Method: ', request.method)
    console.log('Path: ', request.path)
    console.log('Body: ', request.body)
    console.log('___________________________')
    next()

}
app.use(requestLogger)

app.get('/', (request, response) => {
    response.send('<h1>Welcome to Info API</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => (
        response.json(persons)
    ))
})
app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(note => 
        {if (person){
            response.json(person)

        }else{
            response.status(404).send()
        }
    })

})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id).then(person => {
        if (person) {
            response.status(204).send()
        } else {
            response.status(404).send()
        }
    })
})

app.post('/api/persons', (request, response) => {
    
    const body=request.body;
  
    const person = new Person({
      name: body.name,
      number: body.number 
    });
  
    person.save().then(savedPerson => {
      response.json(savedPerson);
    }).catch(error => {
      response.status(500).send(error.message);
    });
})

app.put('/api/persons/:id',(request,response)=>{
    const id = request.params.id;
    const body = request.body;
  
    Person.findByIdAndUpdate(id, {
      name: body.name,
      number: body.number,
    }, { new: true })
    .then(updatedPerson => {
      if (updatedPerson) {
        response.json(updatedPerson);
      } else {
        response.status(404).send();
      }
    })
    .catch(error => {
      response.status(500).send(error.message);
    })

})

const unknowPath=(request,response)=>{
    response.status(404).json({
        error:'unknow Path'
    })
    
}

app.use(unknowPath)




app.listen(port, () => console.log(`Phonebook Server app listening on port ${port}!`))
