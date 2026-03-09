const CountryDisplay = ( {countryObject} ) => {
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
    </div>
  )
}
  
  export default CountryDisplay