const rootElem = document.getElementById("root");
rootElem.innerHTML = `
<div id="header">
<h1>Where in the world?</h1>
<p id="mode">Dark Mode</p>
</div>
<div id="countries-container"></div>

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
}
function createNewList(countryList) {
  return countryList
    .map(function (country) {
      return `<div class="country">
            <img class="image" src=${country.flag}
alt= country flag
            <h1 class="country-name">${country.name}</h1>
            
            <p>Population: ${country.population}</p>
            <p>Region: ${country.region}</p>
            <p>Capital: ${country.capital}</p>
            </div>`;
    })
    .join("");
}
window.onload = setup;
