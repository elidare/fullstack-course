import { useState, useEffect } from 'react'
import countryService from './services/countries'

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
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    countryService.getAll().then((countryList) => {
      setCountries(countryList)
    })
  }, [])

  useEffect(() => {
    const filtered = countries.filter((country) => country.name.common.toLowerCase().includes(searchCountry))
    setFilteredCountries(filtered)
  }, [searchCountry])

  const changeSearchCountry = (event) => setSearchCountry(event.target.value)

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
          filteredCountries.map((c) => <p key={c.name.official}>{c.name.common}</p>) :
          filteredCountries.length === 1 ?
          <Country
            countryName={filteredCountries[0].name.common}
            capital={filteredCountries[0].capital[0]}
            area={filteredCountries[0].area}
            languages={Object.values(filteredCountries[0].languages)}
            flagPicture={filteredCountries[0].flags.svg}
          /> :
          null
        } 
      </div>
    </>
  )
}

export default App