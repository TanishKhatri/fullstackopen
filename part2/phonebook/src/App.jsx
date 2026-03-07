import { useEffect, useState } from 'react'
import axios from 'axios'

const Filter = ({handleSearch}) => <div>filter shown with <input type="text" onChange={handleSearch} /></div>

const PersonForm = ({onSubmit, setNewName, setNewPhone, newName, newPhone}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <div>name: <input type="text" value={newName} onChange={(event) => setNewName(event.target.value)}/></div>
        <div>phone: <input type="text" value={newPhone} onChange={(event) => setNewPhone(event.target.value)} /></div>
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
    .map(person => <p key={person.name}>{person.name} {person.phone}</p>)
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
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
      phone: newPhone  
    }
    setPersons(persons.concat(personObject))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={(event) => setSearch(event.target.value)} />

      <h2>add a new</h2>
      <PersonForm 
       onSubmit={handleFormSubmission}
       newName={newName}
       newPhone={newPhone}
       setNewName={setNewName}
       setNewPhone={setNewPhone}
      />
      <h2>Numbers</h2>
      <div>
        <Persons persons={persons} search={search} />
      </div>
    </div>
  )
}

export default App