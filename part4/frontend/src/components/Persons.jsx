const Persons = ({ persons, filteredName, deletePerson }) => {
    return (
        <div>
        {persons
            .filter((person) =>
                person.name.toLowerCase().includes(filteredName.toLowerCase())
            )
            .map((person) =>
                <p key={person.id}>
                    {person.name} {person.number}
                    <button onClick={() => deletePerson(person.id)}>Delete</button>
                </p>
            )}
        </div>
    )
}

export default Persons
