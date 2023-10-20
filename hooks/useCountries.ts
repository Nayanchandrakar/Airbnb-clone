import countries from "world-countries"

const formattedCountries = countries?.map((country) => ({
  value: country?.cca2,
  flag: country.flag,
  latIng: country.latlng,
  region: country.region,
  label: country.name.common,
}))

const useCountries = () => {
  const getAll = formattedCountries
  const getByValue = (value: string) => {
    return formattedCountries.find((data) => data?.label === value)
  }

  return {
    getAll,
    getByValue,
  }
}

export default useCountries
