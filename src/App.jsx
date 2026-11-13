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
          "https://countries.dev/countries?fields=name,capital"
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
  const filteredCountries = countries.filter((country)=>
  country.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <main>
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
            {country.name} - столица: {country.capital}
          </li>
        ))}
      </ul>
      </main>
  )
}

export default App