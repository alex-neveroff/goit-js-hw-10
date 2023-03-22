import './css/styles.css';
import api from './js/api-service';
import getRefs from './js/get-refs';
import { renderingCountryInfo, renderingCountryList } from './js/layout';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const ref = getRefs();
ref.formInput.placeholder = ref.placeholder;

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
