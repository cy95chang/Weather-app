import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";
const Search = (props) => {
  const [search, setSearch] = useState(null);
  console.log(geoApiOptions);
  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
            options: response.data.map((city) => {
                return {
                    value: `${city.latitude} ${city.longitude}`,
                    label: `${city.name}, ${city.countryCode}`
                }
            })
        }
        // return {response}
      })
      .catch((err) => console.error(err));
  };
  const handleOnChange = (searchData) => {
    setSearch(searchData);
    props.onSearchChange(searchData);
    // onSearchChange is called, which is passed over from App.js as props
    // onSeachChange in App.js is named as handleOnSearchChange
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={10}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
