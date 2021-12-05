const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())

morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

let persons = [
    {
      name: "Arto Hellas",
      number: "040-123456",
      id: 1
    },
    {
      name: "Ada Lovelace",
      number: "39-44-5323523",
      id: 2
    },
    {
      name: "Dan Abramov",
      number: "12-43-234345",
      id: 3
    }
]


app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id == id)
    if(person){
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.get('/api/info', (req, res) => {
    res.send(
        `<p>Phonebook has info for ${persons.length} people</p>` +
        `<p>${new Date()}</p>`
    )
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if(!body) {
        return res.status(400).json({ 
            error: 'content missing' 
        })
    } else if(persons.find(p => p.name === body.name)) {
        return res.status(400).json({ 
            error: 'name must be unique' 
        })
    } else if(!(body.name && body.number)) {
        return res.status(400).json({ 
            error: 'name and number must be specified' 
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random()*10000)
    }

    persons = persons.concat(person)

    res.json(person)
  })

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    console.log('delete')
    res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})