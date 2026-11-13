import { useEffect, useState } from "react"

function App() {
  const [countries, setCountries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error,setError] = useState("")
  const [search,setSearch] = useState("")
    useEffect(() => {
    async function loadCountries() {
      try {
        const response = await fetch(
          "https://countries.dev/countries?fields=name,capital,region,alpha2Code"
        )
        const data = await response.json()

        setCountries(data)
      } catch {
        setError("Не удалось загрузить список стран.")
      } finally {
        setIsLoading(false)
      }
    }

    loadCountries()
  }, [])
  const normalizedSearch = search.toLowerCase()

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(normalizedSearch) ||
    (country.capital ?? "").toLowerCase().includes(normalizedSearch)
  )
  return (
    <main className="app">
      <h1>Каталог стран</h1>
      <input 
      type="search"
      placeholder="Найти страну"
      value={search}
      onChange={(event) => setSearch(event.target.value)}/>
      <p>{
        isLoading
        ?"Загружаем страны..."
      :`Найдено стран: ${filteredCountries.length}`}</p>
      {error && <p>{error}</p>}
      <ul>
        {filteredCountries.map((country)=>(
          <li key={country.name}>
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
        ))}
      </ul>
      </main>
  )
}

export default App