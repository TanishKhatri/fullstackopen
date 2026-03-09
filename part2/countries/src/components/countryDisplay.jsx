import { useEffect, useState } from "react";
import services from "../services/services"

const CountryDisplay = ( {countryObject} ) => {
  const [weatherObj, setWeatherObj] = useState(null)

  useEffect(() => {
    services
    .getCountryWeather(countryObject.lat, countryObject.long)
    .then((response) => {
      setWeatherObj(response)
    })
  }, [countryObject.lat, countryObject.long])

  if (!weatherObj) {
    return null
  }

  return (
    <div>
      <h1>{countryObject.name}</h1>
      <div>{countryObject.capital}</div>
      <div>Area {countryObject.area}</div>
      <h2>Languages</h2>
      <ul>
        {countryObject.languages.map(c => <li key={c}>{c}</li>)}
      </ul>
      <img src={countryObject.flagURL} alt="flag" />
      <h2>Weather in {countryObject.capital}</h2>
      <div>Temperature {weatherObj.temp} Celcius</div>
      <div>Wind {weatherObj.windSpeed} m/s</div>
    </div>
  )
}
  
  export default CountryDisplay