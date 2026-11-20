import { useEffect, useState } from "react"
import CountryCard from "./CountryCard"
const FAVORITES_STORAGE_KEY = "favorite-countries"

function App() {
  const [countries, setCountries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error,setError] = useState("")
  const [search,setSearch] = useState("")
  const [region,setRegion] = useState("all")
  const [sortOrder,setSortOrder] = useState("none")
  const [favoriteCodes, setFavoriteCodes] = useState(() => {
  const savedFavoriteCodes = localStorage.getItem(FAVORITES_STORAGE_KEY)

  return savedFavoriteCodes ? JSON.parse(savedFavoriteCodes) : []
})

const [onlyFavorites, setOnlyFavorites] = useState(false)
    useEffect(() => {
    async function loadCountries() {
      try {
        const response = await fetch(
          "https://countries.dev/countries?fields=name,capital,region,alpha2Code"
        )
        if (!response.ok) {
          throw new Error("Не удалось загрузить страны")
        }
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
  useEffect(()=> {
    localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(favoriteCodes)
    )
    },[favoriteCodes])
  const normalizedSearch = search.toLowerCase()

  const filteredCountries = countries.filter((country)=>{
    const matchesSearch =
    country.name.toLowerCase().includes(normalizedSearch) ||
    (country.capital ?? "").toLowerCase().includes(normalizedSearch)

    const matchesRegion =
    region === "all" || country.region === region
    const matchesFavorites =
    !onlyFavorites || favoriteCodes.includes(country.alpha2Code)
    return matchesSearch && matchesRegion && matchesFavorites
  })
  const sortedCountries = [...filteredCountries].sort((first,second) => {
    if(sortOrder === "asc"){
      return first.name.localeCompare(second.name)
    }
    if (sortOrder === "desc"){
      return second.name.localeCompare(first.name)
    }
    return 0
  })
  function toggleFavorite(code) {
    setFavoriteCodes((currentCodes) => {
      if (currentCodes.includes(code)) {
        return currentCodes.filter(
          (currentCode) => currentCode !==code
        )
      }
      return [...currentCodes,code]
    })
  }
   function resetFilters() {
    setSearch("")
    setRegion("all")
    setSortOrder("none")
    setOnlyFavorites(false)
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
      <select
      value={sortOrder}
      onChange={(event)=> setSortOrder(event.target.value)}>
        <option value="none">Без сортировки</option>
        <option value="asc">По алфавиту: А–Я</option>
        <option value="desc">По алфавиту: Я–А</option>
      </select>
      <button 
      type="button"
      onClick={() => setOnlyFavorites((currentValue) => !currentValue)}
      >
        {onlyFavorites ? "Показать все страны" : "Только избранные"}
        </button>
      <button type="button" onClick={resetFilters}>
        Сбросить фильтры
      </button>
      <p>{
        isLoading
        ?"Загружаем страны..."
      :`Найдено стран: ${filteredCountries.length}`}</p>
      {error && (
        <>
        <p role="alert">{error}</p>
        <button type="button" onClick={()=> window.location.reload()}>
          Повторить загрузку
        </button>
        </>
      )}
      {!isLoading && !error && filteredCountries.length === 0 &&(
        <p>Страны не найдены.</p>
      )}
      <ul>
        {sortedCountries.map((country)=>(
          <CountryCard 
          key={country.name} 
          country={country}
          isFavorite={favoriteCodes.includes(country.alpha2Code)}
          onToggleFavorite={toggleFavorite} />
        ))}
      </ul>
      </main>
  )
}

export default App