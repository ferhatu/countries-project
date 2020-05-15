const rootElem = document.getElementById("root");
rootElem.innerHTML = `
<div class="hide" id="country-details-popup">
  <button id="backBtn">Back</button>
  <div id="country-details"></div>
</div>
<div id="header">
<h1>Where in the world?</h1>
<button id="mode">
<i class="far fa-moon"></i>
Dark Mode
</button>
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
let allData;
function setup() {
  fetch("https://restcountries.eu/rest/v2/all")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      allData = data;
      makePageForCountries(data);
    })
    .catch((error) => {
      console.log("Error", error);
    });
}
function makePageForCountries(countryList) {
  let countriesContainer = document.getElementById("countries-container");
  countriesContainer.innerHTML = createNewList(countryList);
  //Search Field

  let searchField = document.querySelector("#country-search");
  searchField.addEventListener("keyup", function () {
    let filteredCountries = countryList.filter(
      (data) => data.name.toLowerCase().includes(searchField.value)
      //   console.log(searchField.value);
    );
    countriesContainer.innerHTML = createNewList(filteredCountries);
  });
  // Filter Regions
  let filterRegion = document.querySelector("#filter-region");
  filterRegion.addEventListener("change", function (event) {
    let regionValue = event.target.value;
    let countriesFilteredByRegion = countryList.filter((country) => {
      return country.region === regionValue;
    });
    countriesContainer.innerHTML = createNewList(countriesFilteredByRegion);
  });

  let countryDetail = document.querySelectorAll(".image");
  countryDetail.forEach((countryFlag) => {
    countryFlag.addEventListener("click", () => {
      let foundCountry = countryList.find(
        (country) => countryFlag.src === country.flag
      );
      showCountryDetails(foundCountry);
    });
  });
}

function createNewList(countryList) {
  return countryList
    .map(function (country) {
      return `<div class="country">
            <img class="image"  src=${country.flag} 
alt= country flag>
            <h1 class="country-name">${country.name}</h1>
            
            <p>Population: ${country.population}</p>
            <p>Region: ${country.region}</p>
            <p>Capital: ${country.capital}</p>
            </div>`;
    })
    .join("");
}
function showCountryDetails(country) {
  let countryDetails = document.querySelector("#country-details");
  countryDetails.innerHTML = getCountryDetails(country);
  let backButton = document.querySelector("#backBtn");
  let countryDetailsPopup = document.querySelector("#country-details-popup");
  countryDetailsPopup.classList.remove("hide");
  backButton.addEventListener("click", function () {
    countryDetailsPopup.classList.add("hide");
  });
}
function getCountryDetails(country) {
  return `
  <div id="detail-img">      
        <img id="detail-flag" src=${country.flag}  alt=country flag />
  </div>
  <div id="detail-info">
        <h2>${country.name}</h2>
        <p>
            <strong>Native Name:</strong>
            ${country.nativeName}
        </p>
        <p>
            <strong>Population:</strong>
            ${country.population}
        </p>
        <p>
            <strong>Region:</strong>
            ${country.region}
        </p>
        <p>
            <strong>Sub Region:</strong>
            ${country.subregion}
        </p>
        <p>
            <strong>Capital:</strong>
            ${country.capital}
        </p>
        <p>
            <strong>Top Level Domain:</strong>
            ${country.topLevelDomain[0]}
        </p>
        <p>
            <strong>Currencies:</strong>
            ${country.currencies.map((currency) => currency.code)}
        </p>
        <p>
            <strong>Languages:</strong>
            ${country.languages.map((language) => language.name)}
        </p>
    </div>
    `;
}

window.onload = setup;
