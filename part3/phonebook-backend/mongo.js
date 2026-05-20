const mongoose = require('mongoose')

const queryLength = process.argv.length

if ((queryLength !== 3 && queryLength !== 5)) {
  console.log(`USAGE:
- node mongo.js <password> <name> <number> 
(Adds person to DB)
- node mongo.js <password>
Queries all People in the DB`)
  process.exit(1)
} 

const password = process.argv[2]

const url = `mongodb+srv://tanishkhatriofficial_db_user:${password}@cluster0.uneezwr.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(url, {family: 4})

const personSchema = mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  console.log("phonebook:")
  Person.find({}).then(res => {
    res.forEach(p => {
      console.log(`${p.name} ${p.number}`)
    })
    process.exit(0)
  })
} else {
  const newPerson = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  newPerson.save().then(() => {
    console.log(`added ${newPerson.name} number ${newPerson.number} to phonebook`)
    mongoose.connection.close()
  })
}





