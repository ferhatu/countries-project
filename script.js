const rootElem = document.getElementById("root");
rootElem.innerHTML = `
<div id="header">
<h1>Where in the world?</h1>
<p id="mode">Dark Mode</p>
</div>
<div class="search-field">
<input type="search" id="country-search" placeholder="Search country">
<select id="filter-region"> 
<option value=""> All region</option>
          <option value="Europe"> Europe</option>
          <option value="Asia"> Asia</option>
          <option value="Americas">America </option>
          <option value="Africa"> Africa</option>
          <option value="Oceania"> Oceania</option>
</select>
</div>
<div id="countries-container">

</div>

`;
function setup() {
  fetch("https://restcountries.eu/rest/v2/all")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      makePageForCountries(data);
    });
}
function makePageForCountries(countryList) {
  let countries = document.getElementById("countries-container");
  countries.innerHTML = createNewList(countryList);
  //Search Field

  let searchField = document.querySelector("#country-search");
  searchField.addEventListener("keyup", function () {
    console.log(111);
    let filteredCountries = countryList.filter(
      (data) => data.name.toLowerCase().includes(searchField.value)
      //   console.log(searchField.value);
    );
    countries.innerHTML = createNewList(filteredCountries);
  });
  // Filter Regions
  let filterRegion = document.querySelector("#filter-region");
  filterRegion.addEventListener("change", function (event) {
    let regionValue = event.target.value;
    let countriesFilteredByRegion = countryList.filter((country) => {
      return country.region === regionValue;
    });
    countries.innerHTML = createNewList(countriesFilteredByRegion);
  });
}

function createNewList(countryList) {
  return countryList
    .map(function (country) {
      return `<div class="country">
            <img class="image" src=${country.flag}
alt= country flag>
            <h1 class="country-name">${country.name}</h1>
            
            <p>Population: ${country.population}</p>
            <p>Region: ${country.region}</p>
            <p>Capital: ${country.capital}</p>
            </div>`;
    })
    .join("");
}

window.onload = setup;
