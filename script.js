const rootElem = document.getElementById("root");
rootElem.innerHTML = `
<div id="header">
<h1>Where in the world?</h1>
<p id="mode">Dark Mode</p>
</div>
<div class="search-field">
<input type="search" id="country-search" placeholder="Search country">
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
