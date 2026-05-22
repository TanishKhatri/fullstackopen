require('dotenv').config();
const mongoose = require('mongoose');

const queryLength = process.argv.length;

if ((queryLength !== 2 && queryLength !== 4)) {
  console.log(`USAGE:
- node mongo.js <name> <number> 
(Adds person to DB)
- node mongo.js
Queries all People in the DB`);
  process.exit(1);
}

const url = process.env.MONGODB_URI;

mongoose.connect(url, { family: 4 });

const personSchema = mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 2) {
  console.log('phonebook:');
  Person.find({}).then((res) => {
    res.forEach((p) => {
      console.log(`${p.name} ${p.number}`);
    });
    process.exit(0);
  });
} else {
  const newPerson = new Person({
    name: process.argv[2],
    number: process.argv[3],
  });

  newPerson.save().then(() => {
    console.log(`added ${newPerson.name} number ${newPerson.number} to phonebook`);
    mongoose.connection.close();
  });
}
