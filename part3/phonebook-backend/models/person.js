const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);
mongoose.connect(url, { family: 4 })
  .then(() => {
    console.log('MongoDB connected succesfully');
  })
  .catch(() => {
    console.log('Connection to MongoDB Failed');
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Needs to be atleast 3 chars long'],
    required: [true, 'Field Missing'],
  },
  number: {
    type: String,
    validate: {
      validator(v) {
        return /^(\d{2}-\d{6,}|\d{3}-\d{5,})$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
    required: [true, 'Field Missing'],
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
