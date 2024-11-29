import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'



const App = () => {
  const [persons, setPersons] = useState([])

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        console.log(response.data)
      })
  }
  
  useEffect(hook, [])
  console.log('render', persons.length, 'persons')
}

export default App;
