const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.tyotfqs.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const addPerson = (name, number) => {
    const person = new Person({
        name,
        number
    })

    person.save().then(result => {
        console.log(`Added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
}

const showAll = () => {
    Person.find({}).then(result => {
        console.log('Phonebook:')
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}

if (process.argv.length === 3) {
    showAll()
}

if (process.argv.length === 4) {
    console.log('Please give name and number')
    mongoose.connection.close()
}

if (process.argv.length === 5) {
    const name = process.argv[3]
    const number = process.argv[4]

    addPerson(name, number)
}
