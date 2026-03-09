import axios from 'axios'
const allURL = "https://studies.cs.helsinki.fi/restcountries/api/all"
const countryBaseURL = "https://studies.cs.helsinki.fi/restcountries/api/name/"

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
      area: response.data.area
    }
    return countryObject
  })
}


export default { getAllNames, getOneCountry }