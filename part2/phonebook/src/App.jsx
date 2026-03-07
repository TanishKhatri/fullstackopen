import { useEffect, useState } from 'react'
import axios from 'axios'

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

const Persons = ({persons, search}) => {
  return (
    persons
    .filter((person) => person.name.toUpperCase().includes(search.toUpperCase()))
    .map(person => <p key={person.name}>{person.name} {person.number}</p>)
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => setPersons(response.data))
  }, [])

  function handleFormSubmission(event) {
    event.preventDefault()
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber  
    }
    axios
      .post("http://localhost:3001/persons", personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
      })
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
        <Persons persons={persons} search={search} />
      </div>
    </div>
  )
}

export default App