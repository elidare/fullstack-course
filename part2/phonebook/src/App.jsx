import { useState } from 'react'
import Input from './components/Input'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if (!newName || !newNumber) return

    if (persons.some((person) => 
        person.name.trim().toLowerCase() === newName.trim().toLowerCase()
    )) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = {
      id: String(persons.length + 1),
      name: newName,
      number: newNumber,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleFilteredNameChange = (event) => setFilteredName(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Input name="Filter name:" value={filteredName} onChange={handleFilteredNameChange} />
      <h2>Add new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      ></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={persons} filteredName={filteredName}></Persons>
    </div>
  )
}

export default App
