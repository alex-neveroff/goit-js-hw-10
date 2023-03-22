import getRefs from './get-refs';
const ref = getRefs();

function renderingCountryInfo(country) {
  ref.countryInfo.innerHTML = country
    .map(country => {
      return `<div class = "country-info__wrap">
      <img src="${country.flags.svg}" alt="Flag of ${
        country.name.common
      }" width="100" height="50">
         <h2 class = "country-info__title">${country.name.common}</h2></div>
         <p><strong>Full name:</strong> ${country.name.official}</p>
            <p><strong>Capital:</strong> ${country.capital}</p>
            <p><strong>Population:</strong> ${country.population}</p>
            <p><strong>Languages:</strong> ${Object.values(
              country.languages
            ).join(', ')} </p>
                `;
    })
    .join('');
}

function renderingCountryList(countries) {
  ref.countryList.innerHTML = countries
    .map(country => {
      return `<li class = "country-list__item">
      <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" width="100" height="50">
         <p>${country.name.common}</p>
                </li>`;
    })
    .join('');
}

export { renderingCountryInfo, renderingCountryList };
