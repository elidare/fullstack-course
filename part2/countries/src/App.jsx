import { useState, useEffect } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'

const Country = (props) => {
  return (
    <div>
      <h1>{props.countryName}</h1>
        <p>Capital: {props.capital}</p>
        <p>Area: {props.area}</p>
      <h2>Languages</h2>
      <ul>
        {props.languages.map((lang) => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={props.flagPicture} alt={`"Flag of ${props.countryName}`} width="150"/>
      <h2>Weather in {props.capital}</h2>
    </div>
  )
}

const Weather = (props) => {
  // Wind is in kph, so make it mps
  return (
    <div>
      <p>Temperature: {props.temp} Celsius</p>
      <img src={props.picture} alt={`"Weather condition: ${props.condition}`} width="50"/>
      <p>Wind: {(props.wind / 3.6).toFixed(2)} mps</p>
    </div>
  )
}

const CountryName = ({ countryName, onClick }) => {
  return (
    <p>
        {countryName}&nbsp;
        <button onClick={onClick}>Show</button>
    </p>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [displayedCountry, setDisplayedCountry] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)

  useEffect(() => {
    countryService.getAll().then((countryList) => {
      setCountries(countryList)
    })
  }, [])

  useEffect(() => {
    if (displayedCountry) {
      weatherService.getWeather(displayedCountry.capital[0]).then((weather) => {
        setCurrentWeather(weather)
      })
    }
  }, [displayedCountry])

  useEffect(() => {
    const filtered = searchCountry ? 
      countries.filter((country) => country.name.common.toLowerCase().includes(searchCountry)) :
      []
    setFilteredCountries(filtered)
  }, [searchCountry])

  useEffect(() => {
    setDisplayedCountry(filteredCountries.length === 1 ? filteredCountries[0] : null)
  }, [filteredCountries])

  const changeSearchCountry = (event) => setSearchCountry(event.target.value)

  const showCountry = (countryName) => {
    setFilteredCountries(
      filteredCountries.filter((c) => c.name.common === countryName)
    )
  }

  return (
    <>
      <div>
        Find countries:&nbsp;
        <input value={searchCountry} onChange={changeSearchCountry}/>
      </div>
      <div>
        {filteredCountries.length > 10 ?
          'Too many matches, specify another filter' : 
          filteredCountries.length > 1 ?
          filteredCountries.map((c) => <CountryName 
            key={c.name.official}
            countryName={c.name.common}
            onClick={() => showCountry(c.name.common)}
          />) :
          null
        }
        {displayedCountry && 
          <Country
            countryName={displayedCountry.name.common}
            capital={displayedCountry.capital[0]}
            area={displayedCountry.area}
            languages={Object.values(displayedCountry.languages)}
            flagPicture={displayedCountry.flags.svg}
          />
        }
        {displayedCountry && currentWeather &&
          <Weather 
            temp={currentWeather.temp_c}
            picture={currentWeather.condition.icon}
            condition={currentWeather.condition.text}
            wind={currentWeather.wind_kph}
          />
        }
      </div>
    </>
  )
}

export default App