import './css/styles.css';
import api from './js/api-service';
import getRefs from './js/get-refs';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const ref = getRefs();

ref.formInput.addEventListener(
  'input',
  debounce(handleDataInput, DEBOUNCE_DELAY)
);

function handleDataInput(event) {
  const countryInput = event.target.value.trim();
  if (countryInput === '') {
    clearData();
    return;
  }
  api(countryInput)
    .then(apiData => {
      if (apiData.length > 10) {
        clearData();
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (apiData.length > 1 && apiData.length <= 10) {
        clearData();
        renderingCountryList(apiData);
      } else {
        clearInput();
        clearData();
        renderingCountryInfo(apiData);
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      clearInput();
      clearData();
    });
}

function clearData() {
  ref.countryInfo.innerHTML = '';
  ref.countryList.innerHTML = '';
}

function clearInput() {
  ref.formInput.value = '';
}

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
            )} </p>
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
