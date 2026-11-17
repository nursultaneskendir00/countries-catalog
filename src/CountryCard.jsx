function CountryCard ({ country }) {
    return (
        <li>
  <img
    src={`https://flagcdn.com/w80/${country.alpha2Code.toLowerCase()}.png`}
    alt={`Флаг ${country.name}`}
    width="48"
  />

   <div>
    <strong>{country.name}</strong>
    <p>Столица: {country.capital || "Нет данных"}</p>
    <p>Регион: {country.region}</p>
  </div>
</li>
    )
}

export default CountryCard