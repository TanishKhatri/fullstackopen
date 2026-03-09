import axios from 'axios'
const allURL = "https://studies.cs.helsinki.fi/restcountries/api/all"
const countryBaseURL = "https://studies.cs.helsinki.fi/restcountries/api/name/"
const apikey = import.meta.env.VITE_SOME_KEY;

const getAllNames = () => {
  const req = axios.get(allURL)
  return req.then((response) => {
    const names = response.data.map(c => c.name.common)
    return names;
  })
}

const getOneCountry = (countryName) => {
  const req = axios.get(`${countryBaseURL}${countryName}`)
  return req.then((response) => {
    const countryObject = {
      name: response.data.name.common,
      capital: response.data.capital,
      languages: Object.values(response.data.languages),
      flagURL: response.data.flags.png,
      area: response.data.area,
      lat: response.data.latlng[0],
      long: response.data.latlng[1],
    }
    return countryObject
  })
}

const getCountryWeather = (lat, long) => {
  const req = axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${long}?unitGroup=metric&include=current&key=${apikey}&contentType=json`)
  return req.then((response) => {
    const weather = {
      temp: response.data.currentConditions.temp,
      windSpeed: response.data.currentConditions.windspeed
    }
    return weather;
  })
}


export default { getAllNames, getOneCountry, getCountryWeather }