require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')
app.use(express.json())
morgan.token('postString', function(req, res) {return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postString'))
app.use(express.static('dist'))

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
  .catch(error => next(error))
})

app.get('/info', (request, response) => {
  Person.find({}).then(people => {
    response.send(`
      <p>persons has info for ${people.length} people</p>
      <p>${new Date()}</p>  
    `)
  })
  .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(p => {
    if (!p) {
      response.status(404).end()
    } else {
      response.json(p)
    }
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id).then(deleted => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(p => {
      if (!p) {
        response.status(404).end()
      } else {
        const {name, number} = request.body

        p.name = name
        p.number = number

        p.save().then(updatedPerson => {
          response.json(updatedPerson)
        })
        .catch(error => next(error))
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  
  const newPerson = new Person({
    name: body.name,
    number: body.number
  })

  newPerson.save().then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({error: 'malformed id'})
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({error: error.message})
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})