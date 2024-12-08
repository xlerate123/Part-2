import { useState, useEffect } from 'react'
import './App.css';
import personService from './services/persons'

const Filter = ({same, filterName}) => {
return(  
<div>Filter shown with <input value={same} onChange={filterName}/></div>
)
}

const PersonForm = ({addPerson, newName, handleChange, handleNumber, newNumber}) => {
return(
<form onSubmit={addPerson}>
        
        <div>
          name: 
          <input 
          value={newName}
          onChange={handleChange}
          />
        </div>

        <div>number: 
          <input 
          value={newNumber} 
          onChange={handleNumber}
          />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
)
}

const Persons = ({persons, same, setPersons}) => {
return(  
<div>
      {persons.filter((person)=>{
        return same.toLowerCase() === '' ? person : person.name.toLowerCase().includes(same.toLowerCase())
      }).map(person=>
        <p key={person.id}>{person.name} {person.number}<button onClick={() => {
          if (window.confirm(`Delete ${person.name}`)) {
            personService
              .remove(person.id)
              .then(() => {
                setPersons(persons.filter(p => p.id !== person.id))
              })     
          }
        }}>Delete</button></p>
      )}   
</div>
)
}



const App = () => {
  const [persons, setPersons] = useState([]) 
  
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [same, setSame] = useState('')
 
  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length+1
    }
    
    
      if(persons.some(person => person.name===newName)){
        const existing =persons.find((person) => person.name === newName)
        if(window.confirm(`${newName} is already to the phonebook, replace the old number with a new one?`)){
        const updated = {...existing, number:newNumber}

        personService
        .update(existing.id,updated)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id === existing.id ? returnedPerson : person
            )
          );
          setNewName(''); 
          setNewNumber('');
        })
      }}
      else if(newName===''){
        alert("enter name")
      }
      else{
      personService
      .create(nameObject)
      .then((returnedName) => {
        setPersons(persons.concat(returnedName))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }
  
  const filterName = (event) => {
    setSame(event.target.value)
  }
 

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter same={same} filterName={filterName}/>
      
      <h2>Add a new person</h2>
      <PersonForm addPerson={addPerson} handleChange={handleChange} handleNumber={handleNumber} newName={newName} newNumber={newNumber} />
      
      <h2>Numbers</h2>
      <Persons persons={persons} same={same} setPersons={setPersons}  />
      
      
      
    </div>
  )

  
}



export default App;
