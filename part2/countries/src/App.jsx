import { useEffect, useState } from 'react'
import services from "./services/services"
import CountryDisplay from './components/countryDisplay'

const CountriesInSearch = ( {countryList, searchQuery, showButtonOnClick} ) => {
  const [countryObject, setCountryObject] = useState(null)
  const newList = countryList.filter(c => c.toUpperCase().includes(searchQuery.toUpperCase()))
  const country = newList[0];

  useEffect(() => {
    if (newList.length === 1) {
      services
        .getOneCountry(country)
        .then((response) => {
          setCountryObject(response)
        })
    } 
  }, [newList.length, country])

  if (newList.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (newList.length === 1 && countryObject) {
    return (
      <CountryDisplay countryObject={countryObject} />
    )
  } 

  return (
    <div>
      {newList.map((c, i) => {
        return (
          <div key={c}>
            {c} <button onClick={() => {showButtonOnClick(newList[i])}}>Show</button>
          </div>
        )
      })}
    </div>
  )
}

const App = () => {
  const [countrySearchQuery, setCountrySearchQuery] = useState('')
  const [countryList, setCountryList] = useState([])
  const [currentCountryDiv, setCurrentCountryDiv] = useState(<CountriesInSearch countryList={countryList} searchQuery={countrySearchQuery} showButtonOnClick={showButtonOnClick}/>)

  useEffect(() => {
    services
      .getAllNames()
      .then(list => setCountryList(list))
  }, [])

  function showButtonOnClick(country) {
    services
    .getOneCountry(country)
    .then((response) => {
      setCurrentCountryDiv(<CountryDisplay countryObject={response}/>)
    })
  }

  const handleSearch = (event) => {
    setCountrySearchQuery(event.target.value)
    setCurrentCountryDiv(<CountriesInSearch countryList={countryList} searchQuery={countrySearchQuery} showButtonOnClick={showButtonOnClick}/>)
  }

  return (
    <div>
      <div>find countries <input type="text" value={countrySearchQuery} onChange={(event) => handleSearch(event)} /></div>
      <div>
        {currentCountryDiv}
      </div>
    </div>
  )
}

export default App
