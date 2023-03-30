const { request, response } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors =require('cors')
const app = express()

app.use(morgan('tiny'))
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }), (req, res, next) => {
    console.log(JSON.stringify(req.body));
    next();
  });
  


let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "040-123456"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "040-123456"
    },
    {
        "id": 4,
        "name": "Mary Poppendick",
        "number": "040-123456"
    }]


app.get('/', (request, response) => {
    response.send('<h1>Welcome to Info API</h1>')
})
app.get('/info', (request, response) => {
    const date = new Date();
    const numContacts = persons.length
    response.send(`<h1>Phonebook has info for ${numContacts} people</h1><h1>${date}</h1>`)

})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(x => x.id === id)
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).send()
    }

})
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const size = persons.length
    persons = persons.filter(x => x.id !== id)
    if (size > persons.length) {
        response.status(204).send()
    }
    else {
        response.status(404).send()
    }
})
const generateId = () => {
    const rango = 100;
    return Math.floor(Math.random() * rango);
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Name or number is missing'
        });
    }
    const existingPerson = persons.find(person => person.name === body.name);
    if (existingPerson) {
        return response.status(400).json({
            error: 'The name already exists on the agenda'
        });
    }
    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }
    persons = persons.concat(person)
    response.json(person)
})

app.put('/api/persons/:id',(request,response)=>{
    const id=Number(request.params.id)
    const body=request.body
    const person=persons.find(x=>x.id===id)
    const personUpdate={
        name:body.name,
        number:body.number,
        id:body.id
    }
    if(person){
        persons=persons.map(x=>x.id!==id? x:personUpdate)
        response.json(personUpdate)
    }
    else{
        response.status(404).send()
    }

})

const unknowPath=(request,response)=>{
    response.status(404).json({
        error:'unknow Path'
    })
    
}

app.use(unknowPath)



const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running in ${PORT}`)
})