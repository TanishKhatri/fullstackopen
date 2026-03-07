import { useEffect, useState } from 'react'
import peopleServices from './services/services'

const Filter = ({handleSearch}) => <div>filter shown with <input type="text" onChange={handleSearch} /></div>

const PersonForm = ({onSubmit, setNewName, setNewNumber, newName, newNumber}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <div>name: <input type="text" value={newName} onChange={(event) => setNewName(event.target.value)}/></div>
        <div>phone: <input type="text" value={newNumber} onChange={(event) => setNewNumber(event.target.value)} /></div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({persons, search, deleteOnClick}) => {
  return (
    persons
    .filter((person) => person.name.toUpperCase().includes(search.toUpperCase()))
    .map(person => <p key={person.name}>{person.name} {person.number} <button onClick={() => deleteOnClick(person.id)}>delete</button></p>)
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    peopleServices
      .getAll()
      .then(personsData => setPersons(personsData))
  }, [])

  const deleteOnClick = (id) => {
    const person = persons.find(p => p.id === id)
    if (!confirm(`Delete ${person.name} ?`)) {
      return;
    }
    peopleServices.deletePerson(id)
    setPersons(persons.filter(person => person.id !== id))
  }

  function handleFormSubmission(event) {
    event.preventDefault()
    const checkPerson = persons.find(person => person.name === newName);
    if (checkPerson) {
      const personObject = {
        name: newName,
        number: newNumber  
      }
      const id = checkPerson.id
      peopleServices
        .update(id, personObject)
        .then(p => {
          setPersons(persons.map(person => person.id === id ? p : person))
        })
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber  
    }
    peopleServices
      .create(personObject)
      .then(p => setPersons(persons.concat(p)))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={(event) => setSearch(event.target.value)} />

      <h2>add a new</h2>
      <PersonForm 
       onSubmit={handleFormSubmission}
       newName={newName}
       newNumber={newNumber}
       setNewName={setNewName}
       setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <div>
        <Persons persons={persons} search={search} deleteOnClick={deleteOnClick} />
      </div>
    </div>
  )
}

export default App