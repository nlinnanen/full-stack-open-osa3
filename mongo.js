const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]

const url =
  `mongodb+srv://nikkenakke:${password}@cluster0.q4xss.mongodb.net/persons?retryWrites=true&w=majority`

mongoose.connect(url)


const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (newName && newNumber) {
  const person = new Person({
    name: newName,
    number: newNumber
  })

  person
      .save()
      .then(response => {
        console.log(`Added ${response.name} number ${response.number} to phonebook `)
        mongoose.connection.close()
      })
} else {
  Person
      .find({})
      .then((result) => {
        result.forEach(console.log)
        mongoose.connection.close()
      })
}