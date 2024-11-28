import { useState } from 'react'

import './App.css';

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

const Persons = ({persons, same}) => {
return(  
<div>
      {persons.filter((person)=>{
        return same.toLowerCase() === '' ? person : person.name.toLowerCase().includes(same.toLowerCase())
      }).map(person=>
        <p key={person.id}>{person.name} {person.number}</p>
      )}
      </div>
)
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',number: 9090909009  ,id:1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  
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
        alert(`${newName} already exists`)
      }
      else if(newName===''){
        alert("enter name")
      }
      else{
        setPersons(persons.concat(nameObject))
        setNewName('');
        setNewNumber('')
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
      <Persons persons={persons} same={same} />
      
    </div>
  )

  
}



export default App;
