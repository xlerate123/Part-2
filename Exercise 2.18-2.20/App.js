import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';


function App() {
  const [name, setName] = useState('')
  const [show,setShow] = useState([])
  const [selectedcountry, setSelectedCountry] = useState([])
  const [weather, setWeather] = useState([])

const apikey = process.env.REACT_APP_API_KEY;



useEffect(() => {
  if(name){
    axios
     .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
     .then((response)=> {
      const filteredCountries = response.data.filter((country) => 
        country.name.common.toLowerCase().includes(name.toLowerCase())
      )
      setShow(filteredCountries)
      if (filteredCountries.length === 1) {
        setSelectedCountry(filteredCountries[0]);}
     })     
}
else{
  setShow([])
}
}, [name])


useEffect(() => {
  if(selectedcountry){
  axios
  .get(`https://api.openweathermap.org/data/2.5/weather?q=${selectedcountry.capital}&appid=${apikey}&units=metric`)
  .then((response) => {
   setWeather(response.data)
   
  })}
  
},[selectedcountry, apikey])


const filterName = (event) => {
    setName(event.target.value)
}

const handleShowClick = (country) => {
  setSelectedCountry(country)
  setWeather([])
};
console.log(weather)

const renderWeather = () => {
  if (weather && weather.main) {
    const iconCode = weather.weather[0].icon
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

    return (
      <>
        <img src={iconUrl} alt={weather.weather[0].description} />
        <p>Temperature: {weather.main.temp} °C</p>
        <p>Wind: {weather.wind.speed} m/s</p>
      </>
    );
  }
  return <p>Loading weather data...</p>;
}

return (
    <>
    <p>Find Countries <input value={name} onChange={filterName}></input></p>
    
        {show.length !==1 ? (show.length <=10 ? show.map((country) => (
          <>
          <p key={country.cca3}>
            {country.name.common}<button onClick={() => 
              handleShowClick(country)
            }>show</button> 
            {selectedcountry?.cca3 === country.cca3 &&(
            <>
          <h2>{`${country.name.common}`}</h2>
          <p>Capital : {country.capital}</p>
          <p>Area: {country.area} kmsq</p>
          <h3>Languages</h3>
          <ul>
          {Object.values(country.languages).map((language, index) => (
          <li key={index} className='lang'>{language}</li>
          ))}
          </ul>
          
          <img
          src={`https://flagcdn.com/w320/${country.cca2.toLowerCase()}.png`}
          width="150"
          alt={`${country.name.common}`} />
          <h3>Weather in {country.capital}</h3>

{renderWeather()}
          </>
          )}
          </p>  
          </>
          )) : <p>Too Many matches, specify another filter</p>) :
          
          <div key={selectedcountry.cca3}>
            
          <h2>{`${selectedcountry.name.common}`}</h2>
          <p>Capital : {selectedcountry.capital}</p>
          <p>Area: {selectedcountry.area} kmsq</p>
          <h3>Languages</h3>
          <ul>
          {Object.values(selectedcountry.languages).map((language, index) => (
          <li key={index} className='lang'>{language}</li>
          ))}
          </ul>
          
          <img
          src={`https://flagcdn.com/w320/${show[0].cca2.toLowerCase()}.png`}
          width="150"
          alt={`${selectedcountry.name.common}`} />

          <h3>Weather in {selectedcountry.capital}</h3>

          {renderWeather()}
          </div>
          }
      

    </>
  );
}

export default App;
