function CountryCard ({ country, isFavorite, onToggleFavorite }) {
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
    <button
    type="button"
    className={isFavorite ? "is-favorite" : ""}
    onClick={() => onToggleFavorite (country.alpha2Code)}
    >
      {isFavorite ? "★ В избранном" : "☆ В избранное"}
    </button>
  </div>
</li>
    )
}

export default CountryCard