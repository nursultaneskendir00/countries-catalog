import { useEffect, useState } from "react"
import CountryCard from "./CountryCard"

function App() {
  const [countries, setCountries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error,setError] = useState("")
  const [search,setSearch] = useState("")
  const [region,setRegion] = useState("all")
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

  const filteredCountries = countries.filter((country)=>{
    const matchesSearch =
    country.name.toLowerCase().includes(normalizedSearch) ||
    (country.capital ?? "").toLowerCase().includes(normalizedSearch)

    const matchesRegion =
    region === "all" || country.region === region
    return matchesSearch && matchesRegion
  })
   function resetFilters() {
    setSearch("")
    setRegion("all")
   } 
  return (
    <main className="app">
      <h1>Каталог стран</h1>
      <input 
      type="search"
      placeholder="Найти страну"
      value={search}
      onChange={(event) => setSearch(event.target.value)}/>
      <select
      value={region}
      onChange={(event)=> setRegion(event.target.value)}>
      <option value="all">Все регионы</option>
      <option value="Africa">Африка</option>
      <option value="Americas">Америка</option>
      <option value="Asia">Азия</option>
      <option value="Europe">Европа</option>
      <option value="Oceania">Океания</option>
      </select>
      <button type="button" onClick={resetFilters}>
        Сбросить фильтры
      </button>
      <p>{
        isLoading
        ?"Загружаем страны..."
      :`Найдено стран: ${filteredCountries.length}`}</p>
      {error && <p>{error}</p>}
      {!isLoading && !error && filteredCountries.length === 0 &&(
        <p>Страны не найдены.</p>
      )}
      <ul>
        {filteredCountries.map((country)=>(
          <CountryCard key={country.name} country={country} />
        ))}
      </ul>
      </main>
  )
}

export default App