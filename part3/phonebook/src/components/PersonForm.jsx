import Input from './Input'

const PersonForm = (props) => {
    return (
      <form onSubmit={props.addPerson}>
        <div>
          <Input name="Name:" value={props.newName} onChange={props.handleNameChange} />
        </div>
        <div>
          <Input name="Number:" value={props.newNumber} onChange={props.handleNumberChange} />
        </div>
        <button type="submit">Add</button>
      </form>
    )
}

export default PersonForm
