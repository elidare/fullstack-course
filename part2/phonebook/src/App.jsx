import { useState, useEffect } from 'react'
import Input from './components/Input'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')
  const [notification, setNotification] = useState({ message: null, type: null })

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (!newName || !newNumber) return

    const person = persons.find((person) => 
        person.name.trim().toLowerCase() === newName.trim().toLowerCase()
    )

    if (person) {
      if (!confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) return

      const updatedPerson = {
        ...person,
        number: newNumber,
      }
      personService.update(person.id, updatedPerson).then((returnedPerson) => {
        setPersons(persons.map((person) => person.id !== returnedPerson.id ? person : returnedPerson))
        setNewName('')
        setNewNumber('')
        showMessage(`${newName} was updated.`, 'success')
      })
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    personService.create(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      showMessage(`${newName} was added to phonebook.`, 'success')
    })
  }

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id == id)

    if (!confirm(`Delete ${person.name}?`)) return

    personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter((p) => p.id !== id))
        showMessage(`${person.name} was deleted from phonebook.`, 'success')
      })
      .catch((error) => {
        showMessage(`${person.name} was already deleted from phonebook.`, 'error')
      })
  }

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleFilteredNameChange = (event) => setFilteredName(event.target.value)

  const showMessage = (message, type) => {
    setNotification({
      message: message,
      type: type
    })
    setTimeout(() => {
        setNotification({ message: null, type: null })
    }, 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
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
      <Persons persons={persons} filteredName={filteredName} deletePerson={deletePerson}></Persons>
    </div>
  )
}

export default App
